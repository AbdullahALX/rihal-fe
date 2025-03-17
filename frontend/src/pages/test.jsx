import React, { useState } from 'react';
import Nav from '../components/navbar';

const Test = () => {
  const [isMap, setIsMap] = useState(true); // Start with Map view

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center px-10 overflow-hidden">
      <Nav />
    </div>
  );
};

export default Test;
