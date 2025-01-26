import React from 'react';
import Nav from '../components/navbar';
import WidgetsContainer from '../components/widgetsContainer';
import AiContainer from '../components/ai/aiContainer';

import { Button } from '@heroui/react';

const dashboard = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center ">
      <Nav />

      <div className=" w-full  rounded-md  py-5 px-10">
        <div className="flex gap-2 items-center flex-row justify-between ">
          <p className="font-thin text-4xl leading-5 tracking-wider">
            General statistics
          </p>
          <div className="flex flex-row gap-2">
            <Button
              radius="full"
              className="font-extralight bg-transparent border-foreground-800 border-2 px-6 tracking-wide"
            >
              Refresh
            </Button>
            <Button
              radius="full"
              className="font-extralight bg-transparent border-foreground-800§ border-2 px-6 tracking-wide"
            >
              Widgets
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-row py-2 px-10 mb-7 justify-between gap-2 ">
        <WidgetsContainer />
        <AiContainer />
      </div>
    </div>
  );
};

export default dashboard;
