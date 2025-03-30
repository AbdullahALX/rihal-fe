import React, { useState } from 'react';
import Nav from '../components/nav/navbar';
import MapContainer from '../components/map/mapContainer';
import WidgetsContainer from '../components/widgetsContainer';
import AiContainer from '../components/ai/aiContainer';

const Dashboard = () => {
  const [isMap, setIsMap] = useState(true); // Start with Map view

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center px-10 overflow-hidden">
      <Nav />
      {/* <div className="w-full h-full flex flex-row p-5 justify-between gap-2">
        {isMap ? (
          <WidgetsContainer toggleView={() => setIsMap(false)} />
        ) : (
          <MapContainer toggleView={() => setIsMap(true)} />
        )}
        <AiContainer />
      </div> */}
    </div>
  );
};

export default Dashboard;
