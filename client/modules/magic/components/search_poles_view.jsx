import _, { set } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "echarts-gl";
import ReactECharts from "echarts-for-react";
import SearchPolesListItem from "/client/modules/magic/components/search_poles_list_item";
import { Button, ButtonGroup, Input } from "semantic-ui-react";
import plateBoundaries from "/lib/modules/er/plate_boundaries.js";

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function generateUncertaintyEllipse(poleLat, poleLon, alpha95) {
  const poleLat_rad = toRadians(poleLat);
  const poleLon_rad = toRadians(poleLon);
  const alpha95_rad = toRadians(alpha95);
  const numPoints = 10 + 50 * alpha95;
  const ellipsePoints = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (2 * Math.PI * i) / numPoints;
    const lat = toDegrees(
      Math.asin(
        Math.sin(poleLat_rad) * Math.cos(alpha95_rad) +
          Math.cos(poleLat_rad) * Math.sin(alpha95_rad) * Math.cos(angle)
      )
    );
    const lon = toDegrees(
      poleLon_rad +
        Math.atan2(
          Math.sin(angle) * Math.sin(alpha95_rad) * Math.cos(poleLat_rad),
          Math.cos(alpha95_rad) -
            Math.sin(poleLat_rad) * Math.sin(toRadians(lat))
        )
    );
    ellipsePoints.push([lat, lon]);
  }

  return ellipsePoints;
}

export default SearchPolesView = ({ style, es }) => {
  const [poles, setPoles] = useState([]);
  const [selectedPoleId, setSelectedPoleId] = useState(undefined);
  const [pageSize, setPageSize] = useState(100);
  const [uncertainty, setUncertainty] = useState(false);
  const [pending, setPending] = useState(0); // track globe updates
  // ECharts instances and sync guards
  const leftChartRef = useRef(null);
  const rightChartRef = useRef(null);
  const syncingFromLeft = useRef(false);
  const syncingFromRight = useRef(false);
  const leftViewRef = useRef({ alpha: 0, beta: 0, distance: undefined });
  const rightViewRef = useRef({ alpha: 0, beta: 0, distance: undefined });
  const sharedDistanceRef = useRef(undefined);
  const zoomRAFRef = useRef(null);
  const zoomEndAtRef = useRef(0);
  // Layout calculations for responsive two-globe view
  const sidePanelWidth = 180;
  const detailsHeight = 194.5; // space reserved for the details panel below
  const availableWidth = Math.max(0, (style?.width || 0) - sidePanelWidth);
  const availableHeight = Math.max(0, (style?.height || 0) - detailsHeight);
  const isTall = availableHeight >= availableWidth;
  const chartWidth = isTall
    ? availableWidth
    : Math.max(0, Math.floor(availableWidth / 2));
  const chartHeight = isTall
    ? Math.max(0, Math.floor(availableHeight / 2))
    : availableHeight;
  const chartsContainerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: isTall ? "column" : "row",
  };
  const firstChartStyle = {
    padding: 0,
    margin: "0",
    width: chartWidth,
    height: chartHeight,
    borderRight: isTall ? "none" : "1px solid #D4D4D5",
    borderBottom: isTall ? "1px solid #D4D4D5" : "none",
    flexGrow: 0,
    flexShrink: 0,
  };
  const secondChartStyle = {
    padding: 0,
    margin: "0",
    width: chartWidth,
    height: chartHeight,
    flexGrow: 0,
    flexShrink: 0,
  };
  // Removed layout-based zoom adjustment per request; initial zoom is set in globe options
  // Build plate boundary line data once
  const plateLines = useMemo(() => {
    try {
      const lines = [];

      // Function to split coordinates that cross the international date line
      const splitDateLineCrossings = (coords) => {
        const segments = [];
        let currentSegment = [];

        for (let i = 0; i < coords.length; i++) {
          const [lon, lat] = coords[i];

          if (currentSegment.length > 0) {
            const [prevLon] = currentSegment[currentSegment.length - 1];
            const lonDiff = lon - prevLon;

            // More sophisticated date line crossing detection
            // Look for large jumps in longitude that indicate wrapping
            const crossesDateLine =
              lonDiff > 180 || // Jump from negative to positive across date line
              lonDiff < -180 || // Jump from positive to negative across date line
              Math.abs(lonDiff) > 300; // Very large jump indicating wrap-around

            if (crossesDateLine) {
              // End current segment if it has enough points
              if (currentSegment.length > 1) {
                segments.push([...currentSegment]);
              }
              currentSegment = [[lon, lat]];
            } else {
              currentSegment.push([lon, lat]);
            }
          } else {
            currentSegment.push([lon, lat]);
          }
        }

        // Add the final segment if it has enough points
        if (currentSegment.length > 1) {
          segments.push(currentSegment);
        }

        return segments;
      };

      // Function to filter out very long line segments that are likely artifacts
      const filterArtifacts = (segments, plateCode, plateName) => {
        return segments.filter((segment) => {
          if (segment.length < 2) return false;

          for (let i = 1; i < segment.length; i++) {
            const [lon1, lat1] = segment[i - 1];
            const [lon2, lat2] = segment[i];
            if (
              Math.abs(Math.abs(lon1) - 180) < 5 &&
              Math.abs(Math.abs(lon2) - 180) < 5 &&
              Math.abs(lon2 - lon1) < 0.1 &&
              Math.abs(lat2 - lat1) > 1
            ) {
              segment.splice(i - 1, 1);
              i--;
              segment[i] = [lon1, lat2];
            }
          }

          if (segment.length < 2) return false;

          return true;
        });
      };

      let plateIndex = 0;

      (plateBoundaries.features || []).forEach((feat) => {
        const geom = feat && feat.geometry;
        const plateCode = feat?.properties?.Code || "Unknown";
        const plateName = feat?.properties?.PlateName || plateCode;
        plateIndex++;

        if (!geom || !geom.type || !geom.coordinates) return;
        if (geom.type === "Polygon") {
          // Each ring is a boundary; draw all rings
          (geom.coordinates || []).forEach((ring) => {
            const coords = (ring || [])
              .filter((pt) => Array.isArray(pt) && pt.length >= 2)
              .map((pt) => [pt[0], pt[1]]);
            if (coords.length > 1) {
              // Split coordinates at date line crossings
              const segments = splitDateLineCrossings(coords);
              // Filter out artifact segments
              const validSegments = filterArtifacts(
                segments,
                plateCode,
                plateName
              );
              validSegments.forEach((segment) => {
                if (segment.length > 1) {
                  lines.push({
                    coords: segment,
                    plateCode,
                    plateName,
                    color: "#990000",
                  });
                }
              });
            }
          });
        } else if (geom.type === "MultiPolygon") {
          (geom.coordinates || []).forEach((poly) => {
            (poly || []).forEach((ring) => {
              const coords = (ring || [])
                .filter((pt) => Array.isArray(pt) && pt.length >= 2)
                .map((pt) => [pt[0], pt[1]]);
              if (coords.length > 1) {
                // Split coordinates at date line crossings
                const segments = splitDateLineCrossings(coords);
                // Filter out artifact segments
                const validSegments = filterArtifacts(
                  segments,
                  plateCode,
                  plateName
                );
                validSegments.forEach((segment) => {
                  if (segment.length > 1) {
                    lines.push({
                      coords: segment,
                      plateCode,
                      plateName,
                      color: "#990000",
                    });
                  }
                });
              }
            });
          });
        }
      });
      return lines;
    } catch (e) {
      console.error("Error building plate lines", e);
      return [];
    }
  }, []);
  useEffect(() => {
    setPending((c) => c + 1);
    Meteor.call(
      "esPage",
      _.extend({}, es, {
        source: {
          includes: ["rows", "summary"],
        },
        queries: [
          ...es.queries,
          { term: { "summary.contribution._is_activated": "true" } },
        ],
      }),
      pageSize,
      1,
      function (error, results) {
        if (error) {
          console.error("Error", error);
        } else {
          results_poles = [];
          for (item of results) {
            item.rows = item.rows || [];
            item.rows.forEach((row) => {
              if (row.pole_lat && row.pole_lon) {
                results_poles.push({
                  row,
                  rows: item.rows,
                  summary: item.summary,
                  results_pole_id: results_poles.length,
                });
              }
            });
          }
          setPoles(results_poles);
        }
        setPending((c) => Math.max(0, c - 1));
      }
    );
  }, [es, pageSize]);
  useEffect(() => {
    setPending((c) => c + 1);
    Meteor.call(
      "esPage",
      _.extend({}, es, {
        queries: [
          ...es.queries,
          { term: { "summary.contribution._is_activated": "true" } },
        ],
      }),
      1,
      1,
      function (error, results) {
        if (error) {
          console.error("Error", error);
        } else {
          setSelectedPoleId(0);
        }
        setPending((c) => Math.max(0, c - 1));
      }
    );
  }, [es]);
  // Extract age range for color mapping
  const ages = poles
    .map((pole) => {
      // Try to get age from multiple possible fields
      let age = null;
      if (pole.row.age) age = parseFloat(pole.row.age);
      else if (pole.row.age_min) age = parseFloat(pole.row.age_min);
      else if (
        pole.summary &&
        pole.summary._all &&
        pole.summary._all._age_range_ybp &&
        pole.summary._all._age_range_ybp.range
      ) {
        // Use mean of age range
        const range = pole.summary._all._age_range_ybp.range;
        if (range.gte !== undefined && range.lte !== undefined) {
          age = (range.gte + range.lte) / 2;
        } else if (range.gte !== undefined) {
          age = range.gte;
        } else if (range.lte !== undefined) {
          age = range.lte;
        }
      }
      return age;
    })
    .filter((age) => age !== null && !isNaN(age));

  const minAge = ages.length > 0 ? Math.min(...ages) : 0;
  const maxAge = ages.length > 0 ? Math.max(...ages) : 1;
  const ageRange = maxAge - minAge || 1; // avoid division by zero

  // Color interpolation function: red (oldest) to yellow (youngest)
  function getAgeColor(age) {
    if (age === null || isNaN(age)) return "#000"; // default black for unknown age

    // Normalize age to 0-1 range (0 = oldest/red, 1 = youngest/yellow)
    const normalized = ageRange > 0 ? (age - minAge) / ageRange : 0.5;

    // Interpolate between red (255,0,0) and yellow (255,255,0)
    const red = 255;
    const green = Math.round(255 * normalized);
    const blue = 0;

    return `rgb(${red}, ${green}, ${blue})`;
  }

  // Format age with appropriate units (Ga, Ma, Ka)
  function formatAge(ageYears) {
    if (ageYears >= 1e9) {
      return `${(ageYears / 1e9).toFixed(2)} Ga`;
    } else if (ageYears >= 1e6) {
      return `${(ageYears / 1e6).toFixed(1)} Ma`;
    } else if (ageYears >= 1e3) {
      return `${(ageYears / 1e3).toFixed(0)} Ka`;
    } else {
      return `${ageYears.toFixed(0)} years`;
    }
  }
  const points = [];
  const uncertaintyLines = [];
  poles.forEach((pole) => {
    const lat = parseFloat(pole.row.pole_lat);
    const lon = parseFloat(pole.row.pole_lon);
    const a95 = parseFloat(pole.row.pole_alpha95);
    const dp = parseFloat(pole.row.pole_dp);
    const dm = parseFloat(pole.row.pole_dm);

    if (a95 === undefined && dp !== undefined && dm !== undefined) {
      a95 = Math.sqrt(dp * dp + dm * dm);
    }

    const a95Filter = es.filters.filter(
      (x) => x.range?.["summary._all.pole_alpha95.range"]
    );
    const a95FilterMin =
      a95Filter[0]?.range?.["summary._all.pole_alpha95.range"]?.gte;
    const a95FilterMax =
      a95Filter[0]?.range?.["summary._all.pole_alpha95.range"]?.lte;
    if (
      (a95FilterMin && a95 < a95FilterMin) ||
      (a95FilterMax && a95 > a95FilterMax)
    ) {
      return;
    }

    // Get age for this pole
    let age = null;
    if (pole.row.age) age = parseFloat(pole.row.age);
    else if (pole.row.age_min) age = parseFloat(pole.row.age_min);
    else if (
      pole.summary &&
      pole.summary._all &&
      pole.summary._all._age_range_ybp &&
      pole.summary._all._age_range_ybp.range
    ) {
      const range = pole.summary._all._age_range_ybp.range;
      if (range.gte !== undefined && range.lte !== undefined) {
        age = (range.gte + range.lte) / 2;
      } else if (range.gte !== undefined) {
        age = range.gte;
      } else if (range.lte !== undefined) {
        age = range.lte;
      }
    }

    const ageColor = getAgeColor(age);
    const isSelected =
      pole.results_pole_id == selectedPoleId &&
      pole.summary.contribution.id ==
        poles[selectedPoleId]?.summary.contribution.id;

    points.push({
      value: [lon, lat, 0, pole.summary.contribution.id, pole.results_pole_id],
      symbol: "circle",
      symbolSize: 12,
      itemStyle: {
        color: isSelected ? "#800080" : ageColor,
      },
      label: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          color: "#800080",
        },
      },
    });

    if (uncertainty && !isNaN(a95) && a95 > 0) {
      const uncertaintyPoints = [];
      const ellipsePoints = generateUncertaintyEllipse(lat, lon, a95);
      for (const point of ellipsePoints) {
        const [ellipseLat, ellipseLon] = point;
        uncertaintyPoints.push([ellipseLon, ellipseLat, 0]);
      }
      if (uncertaintyPoints.length > 0) {
        uncertaintyLines.push({
          coords: uncertaintyPoints,
          lineStyle: {
            color: isSelected ? "#800080" : ageColor,
            width: 2,
            opacity: 0.8,
          },
        });
      }
    }
  });
  // helpers for angle wrapping and antipodal conversion
  function antipodalView({ alpha, beta, distance }) {
    return {
      alpha: -alpha,
      beta: beta + 180,
      distance,
    };
  }
  function applyView(chart, { alpha, beta, distance }) {
    if (!chart) return;
    // smooth distance to reduce jitter and small drift
    let d = distance;
    if (typeof d === "number") {
      // clamp to wide range to avoid artificial drift
      const MIN_D = 1;
      const MAX_D = 1000;
      d = Math.max(MIN_D, Math.min(MAX_D, d));
    }
    try {
      chart.dispatchAction({
        type: "globeChangeView",
        alpha,
        beta,
        distance: d,
        componentIndex: 0,
      });
    } catch (e) {
      // fallback below
    }
    try {
      chart.setOption(
        { globe: { viewControl: { alpha, beta, distance: d } } },
        false,
        true,
        true
      );
    } catch (e2) {
      // no-op
    }
  }
  function scheduleZoomReconcile(from) {
    // from: 'left' | 'right'
    const source =
      from === "left" ? leftChartRef.current : rightChartRef.current;
    const target =
      from === "left" ? rightChartRef.current : leftChartRef.current;
    const guard = from === "left" ? syncingFromLeft : syncingFromRight;
    if (!source || !target) return;
    // extend reconciliation window instead of restarting loop
    const extendTo = Date.now() + 300; // keep reconciling for 300ms past last event
    zoomEndAtRef.current = Math.max(zoomEndAtRef.current, extendTo);
    if (zoomRAFRef.current) return;
    const step = () => {
      const sv = getView(source);
      const tv = getView(target);
      const sd = sv.distance;
      sharedDistanceRef.current = sd;
      if (typeof sd === "number" && typeof tv.distance === "number") {
        const diff = Math.abs(sd - tv.distance);
        if (diff > 0.003) {
          guard.current = true;
          applyView(target, { alpha: tv.alpha, beta: tv.beta, distance: sd });
          guard.current = false;
        }
      }
      if (Date.now() < zoomEndAtRef.current) {
        zoomRAFRef.current = requestAnimationFrame(step);
      } else {
        zoomRAFRef.current = null;
      }
    };
    zoomRAFRef.current = requestAnimationFrame(step);
  }
  function getView(chart) {
    // Prefer runtime values from the model (reflects current camera)
    try {
      const model = chart.getModel && chart.getModel();
      const globeModel =
        model && model.getComponent && model.getComponent("globe");
      let alpha, beta, distance;
      if (globeModel && globeModel.get) {
        alpha = globeModel.get("viewControl.alpha");
        beta = globeModel.get("viewControl.beta");
        distance = globeModel.get("viewControl.distance");
      }
      if (typeof alpha === "number" && typeof beta === "number") {
        return { alpha, beta, distance };
      }
    } catch (e) {
      // fall through to option-based read
    }
    // Fallback to last set option
    try {
      const opt = chart.getOption();
      const vc =
        (opt && opt.globe && opt.globe[0] && opt.globe[0].viewControl) || {};
      return {
        alpha: typeof vc.alpha === "number" ? vc.alpha : 0,
        beta: typeof vc.beta === "number" ? vc.beta : 0,
        distance: vc.distance,
      };
    } catch (e2) {
      return { alpha: 0, beta: 0, distance: undefined };
    }
  }
  const globeOption = {
    backgroundColor: "#FFF",
    globe: {
      baseTexture: "/MagIC/global_relief_map.jpg",
      //heightTexture: "/MagIC/global_relief_map.jpg",
      // displacementScale: 0.04,
      shading: "lambert",
      viewControl: {
        autoRotate: false,
        autoRotateDirection: "ccw",
        autoRotateAfterStill: 5,
        rotateSensitivity: 2,
        zoomSensitivity: 2,
        distance: 200,
        // targetCoord: [
        //   selectedPole?.row.pole_lon || -45,
        //   selectedPole?.row.pole_lat || 45,
        // ],
      },
      //environment: ROOT_PATH + "/data-gl/asset/starfield.jpg",
      light: {
        ambient: {
          intensity: 1,
        },
        main: {
          intensity: 0,
        },
      },
    },
    series: [
      {
        type: "lines3D",
        coordinateSystem: "globe",
        animation: false,
        polyline: true,
        data: plateLines.map((line) => ({
          coords: line.coords.map((pt) => [pt[0], pt[1], 0]),
          lineStyle: {
            color: line.color,
            opacity: 0.8,
            width: 2,
          },
        })),
        lineStyle: {
          width: 2,
          opacity: 0.8,
        },
        zlevel: -10,
      },
      {
        type: "lines3D",
        coordinateSystem: "globe",
        animation: false,
        polyline: true,
        data: uncertaintyLines,
        lineStyle: {
          width: 2,
          color: "#CCC",
          opacity: 0.45,
        },
        zlevel: -9,
      },
      {
        type: "scatter3D",
        coordinateSystem: "globe",
        animation: false,
        data: points,
        zlevel: -8,
      },
    ],
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "1px solid #D4D4D5",
        }}
      >
        <div style={chartsContainerStyle}>
          <ReactECharts
            style={firstChartStyle}
            option={globeOption}
            renderer="canvas"
            onChartReady={(chart) => {
              leftChartRef.current = chart;
              // Live sync while dragging/zooming using globeRoam events
              const syncRight = (params) => {
                if (syncingFromRight.current) return;
                const right = rightChartRef.current;
                if (!right) return;
                const cur = getView(chart);
                const view = {
                  alpha:
                    typeof params?.alpha === "number"
                      ? params.alpha
                      : leftViewRef.current.alpha ?? cur.alpha,
                  beta:
                    typeof params?.beta === "number"
                      ? params.beta
                      : leftViewRef.current.beta ?? cur.beta,
                  distance:
                    typeof params?.distance === "number"
                      ? params.distance
                      : cur.distance,
                };
                leftViewRef.current = view;
                const targetView = antipodalView(view);
                syncingFromLeft.current = true;
                applyView(right, targetView);
                syncingFromLeft.current = false;
                scheduleZoomReconcile("left");
              };
              // bind roam listeners (ECharts GL); support both casings
              chart.on("globeroam", syncRight);
              chart.on("globeRoam", syncRight);
              // also mirror on raw ZRender wheel for versions that don't propagate distance
              const zrL = chart.getZr();
              let draggingL = false;
              zrL.on("mousedown", () => {
                draggingL = true;
              });
              zrL.on("mousemove", () => {
                if (!draggingL) return;
                const right = rightChartRef.current;
                if (!right) return;
                const v = getView(chart);
                leftViewRef.current = v;
                const tgt = antipodalView(v);
                syncingFromLeft.current = true;
                applyView(right, tgt);
                syncingFromLeft.current = false;
              });
              zrL.on("mouseup", () => {
                draggingL = false;
              });
              const onWheelLeft = () => {
                const right = rightChartRef.current;
                if (!right) return;
                const v = getView(chart);
                leftViewRef.current = v;
                const tgt = antipodalView(v);
                syncingFromLeft.current = true;
                applyView(right, tgt);
                syncingFromLeft.current = false;
                scheduleZoomReconcile("left");
              };
              zrL.on("mousewheel", onWheelLeft);
              zrL.on("wheel", onWheelLeft);
              chart.on("click", function (params) {
                const selected_pole_id = parseInt(params.value[4]);
                setSelectedPoleId(selected_pole_id);
              });
              chart.on("mouseover", function (params) {
                chart.dispatchAction({
                  type: "highlight",
                  seriesIndex: 0,
                  dataIndex: params.dataIndex,
                });
              });
              // removed duplicate syncRight definition
              // initialize right chart to antipodal of left
              const rightInit = rightChartRef.current;
              if (rightInit) {
                const view = getView(chart);
                leftViewRef.current = view;
                const targetView = antipodalView(view);
                syncingFromLeft.current = true;
                applyView(rightInit, targetView);
                rightViewRef.current = targetView;
                syncingFromLeft.current = false;
              }
            }}
          />
          <ReactECharts
            style={secondChartStyle}
            option={globeOption}
            renderer="canvas"
            onChartReady={(chart) => {
              rightChartRef.current = chart;
              // Live sync while dragging/zooming using globeRoam events
              const syncLeft = (params) => {
                if (syncingFromLeft.current) return;
                const left = leftChartRef.current;
                if (!left) return;
                const cur = getView(chart);
                const view = {
                  alpha:
                    typeof params?.alpha === "number"
                      ? params.alpha
                      : rightViewRef.current.alpha ?? cur.alpha,
                  beta:
                    typeof params?.beta === "number"
                      ? params.beta
                      : rightViewRef.current.beta ?? cur.beta,
                  distance:
                    typeof params?.distance === "number"
                      ? params.distance
                      : cur.distance,
                };
                rightViewRef.current = view;
                const targetView = antipodalView(view);
                syncingFromRight.current = true;
                applyView(left, targetView);
                syncingFromRight.current = false;
                scheduleZoomReconcile("right");
              };
              chart.on("globeroam", syncLeft);
              chart.on("globeRoam", syncLeft);
              const zrR = chart.getZr();
              let draggingR = false;
              zrR.on("mousedown", () => {
                draggingR = true;
              });
              zrR.on("mousemove", () => {
                if (!draggingR) return;
                const left = leftChartRef.current;
                if (!left) return;
                const v = getView(chart);
                rightViewRef.current = v;
                const tgt = antipodalView(v);
                syncingFromRight.current = true;
                applyView(left, tgt);
                syncingFromRight.current = false;
              });
              zrR.on("mouseup", () => {
                draggingR = false;
              });
              const onWheelRight = () => {
                const left = leftChartRef.current;
                if (!left) return;
                const v = getView(chart);
                rightViewRef.current = v;
                const tgt = antipodalView(v);
                syncingFromRight.current = true;
                applyView(left, tgt);
                syncingFromRight.current = false;
                scheduleZoomReconcile("right");
              };
              zrR.on("mousewheel", onWheelRight);
              zrR.on("wheel", onWheelRight);
              chart.on("click", function (params) {
                const selected_pole_id = parseInt(params.value[4]);
                setSelectedPoleId(selected_pole_id);
              });
              chart.on("mouseover", function (params) {
                chart.dispatchAction({
                  type: "highlight",
                  seriesIndex: 0,
                  dataIndex: params.dataIndex,
                });
              });
              // removed duplicate syncLeft definition
              // initialize right chart position from left if available
              const leftInit = leftChartRef.current;
              if (leftInit) {
                const view = getView(leftInit);
                leftViewRef.current = view;
                const targetView = antipodalView(view);
                syncingFromLeft.current = true;
                applyView(chart, targetView);
                rightViewRef.current = targetView;
                syncingFromLeft.current = false;
              }
            }}
          />
          {pending > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div
                className="ui active inverted dimmer"
                style={{ position: "absolute", inset: 0 }}
              >
                <div className="ui text loader">Loading</div>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            minWidth: sidePanelWidth,
          }}
        >
          <div
            style={{
              padding: "0.25em 1em 0.5em",
              borderBottom: "1px solid #D4D4D5",
            }}
          >
            <h5
              style={{ color: "rgba(0, 0, 0, 0.87)", marginBottom: "0.25em" }}
            >
              Displayed Locations Poles
            </h5>
            <div style={{ marginBottom: "0.25em" }}>
              Maximum number of locations
            </div>
            <Input
              size="mini"
              defaultValue={pageSize}
              type="number"
              fluid
              onChange={(e, { value }) => {
                setPageSize(value);
              }}
            />
          </div>
          <div
            style={{
              padding: "0.25em 1em 0.5em",
              borderBottom: "1px solid #D4D4D5",
            }}
          >
            <h5
              style={{ color: "rgba(0, 0, 0, 0.87)", marginBottom: "0.25em" }}
            >
              Uncertainty Ellipses
            </h5>
            <div style={{ marginBottom: "0.25em" }}>
              Show or hide uncertainty ellipses
            </div>
            <ButtonGroup size="mini" fluid>
              <Button active={uncertainty} onClick={() => setUncertainty(true)}>
                Show
              </Button>
              <Button
                active={!uncertainty}
                onClick={() => setUncertainty(false)}
              >
                Hide
              </Button>
            </ButtonGroup>
          </div>
          <div
            style={{
              padding: "0.25em 1em 0.5em",
            }}
          >
            <h5
              style={{ color: "rgba(0, 0, 0, 0.87)", marginBottom: "0.25em" }}
            >
              Color Legend
            </h5>
            <div style={{ fontSize: "0.8em" }}>
              {/* Age gradient legend */}
              <div style={{ marginBottom: "0.5em" }}>
                <div style={{ marginBottom: "0.25em", fontWeight: "bold" }}>
                  Age
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2em",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5em",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "rgb(255, 255, 0)",
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span>{formatAge(minAge)}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5em",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "rgb(255, 170, 0)",
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span>{formatAge(minAge + ageRange * 0.33)}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5em",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "rgb(255, 85, 0)",
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span>{formatAge(minAge + ageRange * 0.67)}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5em",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "rgb(255, 0, 0)",
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span>{formatAge(maxAge)}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5em",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "#000",
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span>Unknown Age</span>
                  </div>
                </div>
              </div>
              {/* Selected pole legend */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5em",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      backgroundColor: "#800080",
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span style={{ fontWeight: "bold" }}>Selected Pole</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedPoleId !== undefined && poles.length > selectedPoleId && (
        <div style={{ backgroundColor: "white", padding: 10 }}>
          <SearchPolesListItem
            table="locations"
            item={poles[selectedPoleId]}
            key={selectedPoleId}
          />
        </div>
      )}
      {(selectedPoleId == undefined || poles.length <= selectedPoleId) && (
        <div style={{ padding: 0, minHeight: "194.5px", position: "relative" }}>
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      )}
    </div>
  );
};
