import { Meteor } from "meteor/meteor";
import _ from "lodash";
import fs from "fs";
import path from "path";

// Simple in-memory cache
let cache = {
  loaded: false,
  labels: [], // [{ key, label }]
  aggs: {}, // { [label]: { filter: { geo_shape: { ... } } } }
  shapesByLabel: {}, // { [label]: { type: 'polygon', coordinates: [...] } }
};

function geomToBBoxPolygon(geom) {
  try {
    let lonMin = Infinity,
      lonMax = -Infinity,
      latMin = Infinity,
      latMax = -Infinity;
    const visitCoords = (coords) => {
      if (!coords) return;
      if (typeof coords[0] === "number" && typeof coords[1] === "number") {
        const lon = coords[0];
        const lat = coords[1];
        if (!isNaN(lon) && !isNaN(lat)) {
          lonMin = Math.min(lonMin, lon);
          lonMax = Math.max(lonMax, lon);
          latMin = Math.min(latMin, lat);
          latMax = Math.max(latMax, lat);
        }
      } else if (Array.isArray(coords)) {
        coords.forEach(visitCoords);
      }
    };
    if (!geom) return null;
    // Support Polygon/MultiPolygon
    if (geom.type && /MultiPolygon/i.test(geom.type)) {
      (geom.coordinates || []).forEach(visitCoords);
    } else {
      visitCoords(geom.coordinates);
    }
    if (
      !isFinite(lonMin) ||
      !isFinite(lonMax) ||
      !isFinite(latMin) ||
      !isFinite(latMax)
    )
      return null;
    // clamp lat
    latMin = Math.max(-90, Math.min(90, latMin));
    latMax = Math.max(-90, Math.min(90, latMax));
    return {
      type: "polygon",
      coordinates: [
        [
          [lonMin, latMin],
          [lonMin, latMax],
          [lonMax, latMax],
          [lonMax, latMin],
          [lonMin, latMin],
        ],
      ],
    };
  } catch (e) {
    return null;
  }
}

function loadCacheIfNeeded() {
  if (cache.loaded) return;
  // Resolve path to the GeoJSON file relative to project root
  const geojsonPath = path.resolve(
    process.cwd(),
    "lib/modules/er/geologic_units.geojson"
  );
  try {
    const data = fs.readFileSync(geojsonPath, { encoding: "utf8" });
    // File is a FeatureCollection with a top-level features array
    const parsed = JSON.parse(data);
    const features = parsed && parsed.features ? parsed.features : [];

    const labels = [];
    const aggs = {};
    const shapesByLabel = {};

    for (const f of features) {
      if (!f || !f.properties || !f.geometry) continue;
      const name = (f.properties.DESCR || "").toString().trim();
      const id = f.properties.RecID;
      if (!name || id === undefined || id === null) continue;
      const bbox = geomToBBoxPolygon(f.geometry);
      if (!bbox) continue;
      const label = `${name} (${id})`;
      labels.push({ key: label, label });
      shapesByLabel[label] = bbox;
      aggs[label] = {
        filter: {
          geo_shape: {
            "summary._all._geo_point": {
              shape: bbox,
              relation: "intersects",
            },
          },
        },
      };
    }

    cache = {
      loaded: true,
      labels: _.sortBy(labels, (x) => x.label.toLowerCase()),
      aggs,
      shapesByLabel,
    };
  } catch (err) {
    // Log but do not crash server
    console.error("Failed to load geologic_units.geojson:", err.message);
    cache = { loaded: true, labels: [], aggs: {}, shapesByLabel: {} };
  }
}

export default function () {
  // Lazy-load on first request to avoid slowing server startup
  Meteor.methods({
    geologicUnitsLabels() {
      this.unblock();
      loadCacheIfNeeded();
      return cache.labels;
    },
    geologicUnitsAggsForLabels(labels) {
      this.unblock();
      loadCacheIfNeeded();
      if (!Array.isArray(labels) || labels.length === 0) return {};
      const out = {};
      labels.forEach((l) => {
        if (cache.aggs[l]) out[l] = cache.aggs[l];
      });
      return out;
    },
    geologicUnitsShapesForLabels(labels) {
      this.unblock();
      loadCacheIfNeeded();
      if (!Array.isArray(labels) || labels.length === 0) return {};
      const out = {};
      labels.forEach((l) => {
        if (cache.shapesByLabel[l]) out[l] = cache.shapesByLabel[l];
      });
      return out;
    },
  });
}
