import React from 'react';
import { Textarea } from '@heroui/react';
import { cn } from '@heroui/react';

const promptInput = React.forwardRef(({ classNames = {}, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      aria-label="Prompt"
      className="min-h-[40px]"
      classNames={{
        ...classNames,
        label: cn('hidden', classNames?.label),
        input: cn('py-0', classNames?.input),
      }}
      minRows={1}
      placeholder=" Send a message to thinker "
      radius="lg"
      variant="bordered"
      {...props}
    />
  );
});

export default promptInput;

promptInput.displayName = 'promptInput';
