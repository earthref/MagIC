import React, { useEffect, useRef, useState } from 'react';
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo';
import { select } from 'd3-selection';
import { feature } from 'topojson-client';

export const SVGMapThumbnail = ({
  markers = [],
  width = 80,
  height = 80
}) => {
  const svgRef = useRef(null);
  const [worldData, setWorldData] = useState(null);

  // Default marker if array is empty or single marker provided
  const normalizedMarkers = Array.isArray(markers) ? markers : (markers ? [markers] : []);

  // Load world atlas data
  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const world = await import('world-atlas/countries-110m.json');
        setWorldData(world.default);
      } catch (error) {
        console.error('Failed to load world data:', error);
      }
    };
    loadWorldData();
  }, []);

  // Calculate center point from all markers
  const getCenterPoint = () => {
    if (normalizedMarkers.length === 0) return { lat: 0, lon: 0 };
    if (normalizedMarkers.length === 1) return normalizedMarkers[0];

    const avgLat = normalizedMarkers.reduce((sum, m) => sum + (m.lat || 0), 0) / normalizedMarkers.length;
    const avgLon = normalizedMarkers.reduce((sum, m) => sum + (m.lon || 0), 0) / normalizedMarkers.length;
    return { lat: avgLat, lon: avgLon };
  };

  useEffect(() => {
    if (!svgRef.current || !worldData || normalizedMarkers.length === 0) return;

    const center = getCenterPoint();
    const { lat, lon } = center;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    const radius = Math.min(width, height) / 2 - 2; // Fill most of the thumbnail

    // Create orthographic projection centered on the target location
    const projection = geoOrthographic()
      .scale(radius)
      .translate([width / 2, height / 2])
      .rotate([-lon, -lat]);

    const path = geoPath().projection(projection);

    // Create graticule (grid lines)
    const graticule = geoGraticule();

    // Add sphere (ocean)
    svg.append('path')
      .datum({ type: 'Sphere' })
      .attr('d', path)
      .attr('fill', '#4a90e2')
      .attr('stroke', 'none');

    // Add graticule lines
    svg.append('path')
      .datum(graticule())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.1)')
      .attr('stroke-width', 0.5);

    // Add high-resolution countries/land masses with realistic colors
    const countries = feature(worldData, worldData.objects.countries);

    // Function to determine color based on country properties
    const getCountryColor = (d) => {
      const countryName = d.properties?.NAME || d.properties?.name || '';

      // Polar regions - white/ice blue
      if (
        countryName.includes('Antarctica') ||
        countryName.includes('Greenland') ||
        countryName.includes('Iceland')
      ) {
        return '#f0f8ff'; // Alice blue for ice
      }

      // Desert regions - tan/beige
      if (
        countryName.includes('Algeria') ||
        countryName.includes('Libya') ||
        countryName.includes('Egypt') ||
        countryName.includes('Saudi Arabia') ||
        countryName.includes('Chad') ||
        countryName.includes('Niger') ||
        countryName.includes('Mali') ||
        countryName.includes('Mauritania') ||
        countryName.includes('Sudan') ||
        countryName.includes('Mongolia') ||
        countryName.includes('Kazakhstan')
      ) {
        return '#deb887'; // Burlywood for desert
      }

      // Tropical/forest regions - darker green
      if (
        countryName.includes('Brazil') ||
        countryName.includes('Congo') ||
        countryName.includes('Indonesia') ||
        countryName.includes('Malaysia') ||
        countryName.includes('Colombia') ||
        countryName.includes('Venezuela') ||
        countryName.includes('Peru') ||
        countryName.includes('Ecuador') ||
        countryName.includes('Gabon') ||
        countryName.includes('Cameroon')
      ) {
        return '#228B22'; // Forest green
      }

      // Default temperate land - olive green
      return '#6B8E23'; // Olive drab
    };

    // Render each country with appropriate coloring
    svg
      .selectAll('.country')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path)
      .attr('fill', getCountryColor)
      .attr('stroke', 'rgba(255,255,255,0.15)')
      .attr('stroke-width', 0.2);

    // Add markers at the target locations
    const sphereRadius = Math.min(width, height) / 2 - 2;
    normalizedMarkers.forEach((marker) => {
      if (marker.lat !== undefined && marker.lon !== undefined) {
        const markerCoords = projection([marker.lon, marker.lat]);
        // Only show markers that are on the front side of the sphere (not null/undefined)
        if (markerCoords && isFinite(markerCoords[0]) && isFinite(markerCoords[1])) {
          // Check if the marker is within the visible circle
          const dx = markerCoords[0] - width / 2;
          const dy = markerCoords[1] - height / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only render if within the visible sphere
          if (distance <= sphereRadius) {
            // Add marker circle with MagIC purple color
            svg.append('circle')
              .attr('cx', markerCoords[0])
              .attr('cy', markerCoords[1])
              .attr('r', 3)
              .attr('fill', '#8B5A8E')
              .attr('stroke', 'white')
              .attr('stroke-width', 1);
          }
        }
      }
    });

    // Add subtle sphere outline
    svg.append('path')
      .datum({ type: 'Sphere' })
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.2)')
      .attr('stroke-width', 1);
  }, [normalizedMarkers, worldData, width, height]);

  if (normalizedMarkers.length === 0) {
    return null;
  }

  return (
    <div className="avatar">
      <div
        className="w-20 h-20 rounded bg-gray-900 overflow-hidden"
        style={{ width, height, minWidth: width, minHeight: height, maxWidth: width, maxHeight: height }}
      >
        <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`} />
      </div>
    </div>
  );
};

export default SVGMapThumbnail;
