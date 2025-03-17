import React, { useState } from 'react';

import {
  ScrollShadow,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from '@heroui/react';
import { Icon } from '@iconify/react';

import MessagingChatMessage from './messagingChatMessage';
import messagingChatAIConversations from './messagingChatAiConversations';

import PromptInputWithEnclosedActions from './promptInputWithEnclosedActions';

const aiContainer = () => {
  const [prompt, setPrompt] = React.useState('');

  return (
    <div className="w-full h-full flex flex-col  rounded-xl bg-foreground-100 justify-center">
      <div className="flex flex-row gap-2 items-center justify-center mt-2">
        <Button
          radius="full"
          className="font-extralight text-[12px] bg-transparent border-foreground-800 border-1 px-6 py-0 h-7 hover:bg-[#2a4d8c] hover:border-0 hover:text-white"
        >
          Today
        </Button>
        <Button
          radius="full"
          className="font-extralight text-[12px] bg-transparent border-foreground-800 border-1 px-6 py-0 h-7 hover:bg-[#2a4d8c] hover:border-0 hover:text-white"
        >
          Trends 2025
        </Button>
        <Button
          radius="full"
          className="font-extralight text-[12px] bg-transparent border-foreground-800 border-1 px-6 py-0 h-7 hover:bg-[#2a4d8c] hover:border-0 hover:text-white"
        >
          Total salary
        </Button>
        <Button
          radius="full"
          className="font-extralight text-[12px] bg-transparent border-foreground-800 border-1 px-6 py-0 h-7 hover:bg-[#2a4d8c] hover:border-0 hover:text-white"
        >
          Social networks
        </Button>
      </div>
      <div className="relative flex h-full flex-col">
        <ScrollShadow className="flex h-full max-h-[63vh] flex-col gap-6 overflow-y-auto p-6 pb-8 ">
          {messagingChatAIConversations.map(
            (messagingChatAIConversation, idx) => (
              <MessagingChatMessage
                key={idx}
                classNames={{
                  base: 'bg-default-50 border-2',
                }}
                {...messagingChatAIConversation}
              />
            )
          )}
        </ScrollShadow>
        <div className="mt-auto flex max-w-full flex-col gap-2 px-6 mb-5">
          <PromptInputWithEnclosedActions
            classNames={{
              button:
                'bg-default-foreground opacity-100 w-[30px] h-[30px] !min-w-[30px] self-center',
              buttonIcon: 'text-background',
              input: 'placeholder:text-default-500',
            }}
            prompt={prompt}
            setPrompt={setPrompt}
          />
        </div>
      </div>
    </div>
  );
};

export default aiContainer;
