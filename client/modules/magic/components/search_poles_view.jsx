import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import "echarts-gl";
import ReactECharts from "echarts-for-react";
import SearchPolesListItem from '/client/modules/magic/components/search_poles_list_item';
import { Button, ButtonGroup, Input } from 'semantic-ui-react';

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
          Math.cos(alpha95_rad) - Math.sin(poleLat_rad) * Math.sin(toRadians(lat))
        )
    );
    ellipsePoints.push([lat, lon]);
  }
  
  return ellipsePoints;
}

export default SearchPolesView = ({ style, es }) => {
  const [poles, setPoles] = useState([]);
  const [selectedPole, setSelectedPole] = useState(undefined);
  const [pageSize, setPageSize] = useState(100);
  const [autoRotate, setAutoRotate] = useState(false);
  const [uncertainty, setUncertainty] = useState(false);
  useEffect(() => {
    Meteor.call(
      "esPage",
      _.extend({}, es, {
        source: {
          includes: [
            "rows.pole_lat",
            "rows.pole_lon",
            "rows.pole_alpha95",
            "rows.pole_dp",
            "rows.pole_dm",
            "rows.pole_conf",
            "rows.location",
            "summary.contribution.id",
          ],
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
          // console.log("Page Results", results);
          setPoles(results);
        }
      }
    );
  }, [es, pageSize]);
  useEffect(() => {
    Meteor.call(
      "esPage",
      _.extend({}, es, {
        queries: [
          ...es.queries,
          { term: { "summary.contribution._is_activated": "true" } },
        ]
      }),
      1,
      1,
      function (error, results) {
        if (error) {
          console.error("Error", error);
        } else {
          item = results[0];
          item["row"] = item.rows[0];
          setSelectedPole(item);
        }
      }
    );
  }, [es]);
  const points = [];
  poles.forEach(pole => {
    pole.rows && pole.rows.forEach((row, i_row) => {
      const lat = parseFloat(row.pole_lat);
      const lon = parseFloat(row.pole_lon);
      const a95 = parseFloat(row.pole_alpha95);
      const dp = parseFloat(row.pole_dp);
      const dm = parseFloat(row.pole_dm);
      if (i_row == 0 && lat && lon) {
        points.push({
          value: [lon, lat, 0, pole.summary.contribution.id, i_row],
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            color:
              pole.summary.contribution.id ==
                selectedPole?.summary.contribution.id
                ? "#800080"
                : "red",
          },
          label: {
            show: false,
            //  formatter: "{b}",
            //  position: "right",
            //  fontSize: 14,
            //  color: "black",
            //  backgroundColor: "white",
            //  borderWidth: 5,
            //  fontWeight: "bold",
          },
          emphasis: {
            itemStyle: {
              color: "#800080",
            },
          },
        });
        if (uncertainty) {
          for (ellipsePoints of generateUncertaintyEllipse(lat, lon, a95)) {
            const [lat, lon] = ellipsePoints;
            points.push({
              value: [lon, lat, 0, pole.summary.contribution.id, i_row],
              symbol: "circle",
              symbolSize: 2,
              itemStyle: {
                color:
                  pole.summary.contribution.id ==
                  selectedPole?.summary.contribution.id
                    ? "#800080"
                    : "green",
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
          }
        }
      }
    });
  });
  // console.log("Points", points);
  // console.log("SelectedPole", selectedPole);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "1px solid #D4D4D5",
        }}
      >
        <ReactECharts
          style={{
            padding: 0,
            margin: "0",
            width: style.width - 200,
            height: style.height ? style.height - 194.5 : 0,
            borderRight: "1px solid #D4D4D5",
            flexGrow: 1,
            flexShrink: 1,
          }}
          option={{
            backgroundColor: "#FFF",
            globe: {
              baseTexture: "/MagIC/global_relief_map_gray.JPG",
              heightTexture: "/MagIC/global_relief_map_gray.JPG",
              // displacementScale: 0.04,
              shading: "lambert",
              viewControl: {
                autoRotate: autoRotate,
                autoRotateDirection: "ccw",
                autoRotateAfterStill: 5,
                rotateSensitivity: 2,
                zoomSensitivity: 2,
                // targetCoord: [
                //   selectedPole?.row.pole_lon || -45,
                //   selectedPole?.row.pole_lat || 45,
                // ],
              },
              //environment: ROOT_PATH + "/data-gl/asset/starfield.jpg",
              light: {
                ambient: {
                  intensity: 1.5,
                },
                main: {
                  intensity: 0,
                },
              },
            },
            series: [
              {
                type: "scatter3D",
                coordinateSystem: "globe",
                data: points,
              },
            ],
          }}
          renderer="canvas"
          onChartReady={(chart) => {
            chart.on("click", function (params) {
              setSelectedPole(undefined);
              Meteor.call(
                "esPage",
                _.extend({}, es, {
                  queries: [
                    ...es.queries,
                    { term: { "summary.contribution.id": params.value[3] } },
                  ],
                }),
                1,
                1,
                function (error, results) {
                  if (error) {
                    //console.error("Error", error);
                  } else {
                    item = results[0];
                    item["row"] = item.rows[0];
                    setSelectedPole(item);
                  }
                }
              );
            });
            chart.on("mouseover", function (params) {
              console.log("Mouseover", params.value);
              chart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: params.dataIndex,
              });
            });
          }}
        />
        <div
          style={{
            minWidth: 200,
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
              Displayed Poles
            </h5>
            <div style={{ marginBottom: "0.25em" }}>
              Maximum number of poles
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
              Auto Rotate
            </h5>
            <div style={{ marginBottom: "0.25em" }}>
              Begin rotating after 5 seconds
            </div>
            <ButtonGroup size="mini" fluid>
              <Button active={autoRotate} onClick={() => setAutoRotate(true)}>
                Rotate
              </Button>
              <Button active={!autoRotate} onClick={() => setAutoRotate(false)}>
                Stationary
              </Button>
            </ButtonGroup>
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
              <Button active={!uncertainty} onClick={() => setUncertainty(false)}>
                Hide
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      {selectedPole && (
        <div style={{ backgroundColor: "white", padding: 10 }}>
          <SearchPolesListItem table="locations" item={selectedPole} />
        </div>
      )}
      {selectedPole == undefined && (
        <div style={{ padding: 0, minHeight: "194.5px", position: "relative" }}>
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      )}
    </div>
  );
};