import React, { useState } from 'react';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Icon } from '@iconify/react';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibXNoYWhiYXpraGFyYWwiLCJhIjoiY20zeXY1czFyMGo5eDJtcTR1eGVtcndweCJ9.jqOcRWNG6OvHr40TWlAm3Q';

const MapContainer = ({ toggleView }) => {
  const [viewport, setViewport] = useState({
    longitude: 55.9754,
    latitude: 21.4735,
    zoom: 5.5,
    pitch: 40,
  });

  return (
    <div className="w-full h-full relative">
      <Icon
        className="text-default-400 absolute top-0 bottom-0 my-auto -left-10 z-10 hover:text-default-300 hover:cursor-pointer"
        icon="carbon:next-filled"
        width="32"
        height="32"
        onClick={toggleView} // Toggle between Map and Widgets
      />
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewport}
        style={{ width: '100%', height: '100%', borderRadius: '12px' }}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      />
    </div>
  );
};

export default MapContainer;
