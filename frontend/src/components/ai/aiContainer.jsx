import React from 'react';

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

// import SidebarContainer from './sidebar-with-chat-history';
import MessagingChatMessage from './messagingChatMessage';
import messagingChatAIConversations from './messagingChatAiConversations';

import PromptInputWithEnclosedActions from './promptInputWithEnclosedActions';

const aiContainer = () => {
  return (
    <div className="w-full h-full flex  rounded-xl bg-[#0e0e0e] justify-center">
      <div className="relative flex h-full flex-col">
        <ScrollShadow className="flex h-full max-h-[63vh] flex-col gap-6 overflow-y-auto p-6 pb-8 ">
          {messagingChatAIConversations.map(
            (messagingChatAIConversation, idx) => (
              <MessagingChatMessage
                key={idx}
                classNames={{
                  base: 'bg-default-50',
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
            placeholder="Send a message to thinker "
          />
        </div>
      </div>
    </div>
  );
};

export default aiContainer;
