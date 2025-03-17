import React, { useState } from 'react';
import { Button, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { cn } from '@heroui/react';
import PromptInput from './promptInput';
import axios from 'axios';

export default function PromptInputWithEnclosedActions(props) {
  // Local state for storing the response from the backend
  const [response, setResponse] = useState(null);

  const sendPrompt = async () => {
    console.log(props.prompt); // Log prompt passed down from parent

    try {
      const res = await axios.post('http://localhost:3001/ask', {
        prompt: props.prompt,
      });
      setResponse(res.data);
      console.log(res);
    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  return (
    <form className="flex w-full items-start gap-2">
      <PromptInput
        {...props}
        classNames={{
          innerWrapper: cn('items-center', props.classNames?.innerWrapper),
          input: cn(
            'text-medium data-[has-start-content=true]:ps-0 data-[has-start-content=true]:pe-0',
            props.classNames?.input
          ),
        }}
        endContent={
          <div className="flex gap-2">
            {!props.prompt && (
              <Tooltip showArrow content="Speak">
                <Button isIconOnly radius="full" variant="light">
                  <Icon
                    className="text-default-500"
                    icon="solar:microphone-3-linear"
                    width={20}
                  />
                </Button>
              </Tooltip>
            )}

            <Tooltip showArrow content="Send message">
              <Button
                isIconOnly
                className={props?.classNames?.button || ''}
                color={!props.prompt ? 'default' : 'primary'}
                isDisabled={!props.prompt}
                radius="full"
                variant={!props.prompt ? 'flat' : 'solid'}
                onPress={sendPrompt}
              >
                <Icon
                  className={cn(
                    '[&>path]:stroke-[2px]',
                    !props.prompt
                      ? 'text-default-500'
                      : 'text-primary-foreground',
                    props?.classNames?.buttonIcon || ''
                  )}
                  icon="solar:arrow-up-linear"
                  width={20}
                />
              </Button>
            </Tooltip>
          </div>
        }
        startContent={
          <Tooltip showArrow content="Add file">
            <Button
              isIconOnly
              className="p-[10px]"
              radius="full"
              variant="light"
            >
              <Icon
                className="text-default-500"
                icon="solar:paperclip-linear"
                width={20}
              />
            </Button>
          </Tooltip>
        }
        value={props.prompt} // Bind value to prompt prop
        onValueChange={props.setPrompt} // Update prompt in parent component on change
      />
    </form>
  );
}
