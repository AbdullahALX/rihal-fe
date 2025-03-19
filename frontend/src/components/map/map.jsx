import React, { useState, useEffect, useCallback, useRef } from 'react';
import Map, { Source, Layer } from 'react-map-gl/mapbox';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from '@/components/theme-provider';
import { geojsonData } from '../../assets/oman2';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibXNoYWhiYXpraGFyYWwiLCJhIjoiY20zeXY1czFyMGo5eDJtcTR1eGVtcndweCJ9.jqOcRWNG6OvHr40TWlAm3Q';

const defaultCenter = [55.9754, 21.4735];
const defaultZoom = 5.3;

const regionCenters = {
  Muscat: [58.3986, 23.588],
  Dhofar: [54.09, 17.0197],
  Musandam: [56.2729, 26.1972],
  'Al Batinah North': [57.53, 24.344],
  'Al Batinah South': [57.52, 23.399],
  'Al Dakhiliyah': [57.534, 22.9314],
  'Al Dhahirah': [56.4843, 23.1936],
  'Al Buraimi': [55.875, 24.2511],
  'Ash Sharqiyah North': [58.58, 22.58],
  'Ash Sharqiyah South': [59.314, 22.054],
  'Al Wusta': [56.3233, 19.6433],
};

const TheMap = () => {
  const { theme } = useTheme();
  const mapRef = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [previousRegion, setPreviousRegion] = useState(null); // Track the previously selected region

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.jumpTo({
        center: defaultCenter,
        zoom: defaultZoom,
      });
    }
  }, []);

  const getCenterFromBounds = (coordinates, regionName) => {
    if (regionCenters[regionName]) {
      return regionCenters[regionName];
    }

    const bounds = new mapboxgl.LngLatBounds();

    if (Array.isArray(coordinates[0][0])) {
      // for MultiPolygon
      coordinates.forEach((polygon) => {
        polygon[0].forEach((coord) => {
          bounds.extend(coord);
        });
      });
    } else {
      // for Polygon
      coordinates.forEach((coord) => {
        bounds.extend(coord);
      });
    }

    if (bounds.isEmpty()) {
      console.warn('Bounds are empty, cannot get center');
      return defaultCenter; // Fallback to default center
    }

    const center = bounds.getCenter(); // Calculate the center
    return [center.lng, center.lat];
  };

  const handleMapClick = useCallback(
    (event) => {
      if (!event.features || event.features.length === 0) return;

      const feature = event.features[0];
      const regionName = feature.properties.region;
      const coordinates = feature.geometry.coordinates;
      const center = getCenterFromBounds(coordinates, regionName);

      console.log('Selected Region:', regionName);

      if (regionName === previousRegion) {
        // If the same region is clicked, zoom out
        mapRef.current.flyTo({
          center: defaultCenter,
          zoom: defaultZoom,
          speed: 1.2,
          pitch: 0,
        });

        setSelectedRegion(null);
        setPreviousRegion(null);
      } else {
        setTimeout(() => {
          mapRef.current.flyTo({
            center: center,
            zoom: 7.5,
            speed: 1.5,
            bearing: 20,
            pitch: 70,
            essential: true,
          });

          setSelectedRegion(regionName);
          setPreviousRegion(regionName);
        }, 10);
      }
    },
    [previousRegion]
  );

  return (
    <div className="w-full h-full relative">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: defaultCenter[0],
          latitude: defaultCenter[1],
          zoom: defaultZoom,
        }}
        style={{ width: '100%', height: '100%', borderRadius: '8px' }}
        mapStyle={
          theme === 'dark'
            ? 'mapbox://styles/mapbox/navigation-night-v1'
            : 'mapbox://styles/mapbox/navigation-day-v1'
        }
        interactiveLayerIds={['polygon-layer']}
        onClick={handleMapClick}
      >
        <Source
          id="geojson-layer"
          type="geojson"
          data={{ type: 'FeatureCollection', features: geojsonData }}
        >
          {/* Default region layer */}
          <Layer
            id="polygon-layer"
            type="fill"
            paint={{
              'fill-color': [
                'case',
                ['==', ['get', 'region'], selectedRegion],
                '#cfb7f6',
                '#888888',
              ],
              'fill-opacity': 0.5,
            }}
          />

          <Layer
            id="polygon-border"
            type="line"
            paint={{ 'line-color': '#000', 'line-width': 1 }}
          />
        </Source>
      </Map>
    </div>
  );
};

export default TheMap;
