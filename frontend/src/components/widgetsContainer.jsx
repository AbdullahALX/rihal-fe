import React, { useState } from 'react';
import TopChart from './topChart';
import LeftBottom from './leftBottom';
import RightBottom from './rightBottom';
import { Icon } from '@iconify/react';
const widgetsContainer = ({ toggleView }) => {
  const [isExpand, setIsExpand] = useState(false);

  // ${
  //   isExpand
  //     ? 'z-10 absolute top-0 bottom-0 left-0 right-0 m-auto  h-screen  w-screen bg-foreground-300 p-10 '
  //     : ''
  // }
  return (
    <div className={`w-full bg-foreground-100 flex rounded-xl relative`}>
      <Icon
        className="text-default-400 absolute top-0 bottom-0 my-auto -left-10 z-10 hover:text-default-300 hover:cursor-pointer"
        icon="carbon:next-filled"
        width="32"
        height="32"
        onClick={toggleView} // Toggle between Map and Widgets
      />
      <div
        className="  w-full flex flex-col  rounded-xl  px-4 gap-2  justify-center relative"
        onClick={() => setIsExpand(!isExpand)}
      >
        <TopChart />
        <div className="flex flex-row w-full gap-2 ">
          <LeftBottom />
          <RightBottom />
        </div>
      </div>
    </div>
  );
};

export default widgetsContainer;
