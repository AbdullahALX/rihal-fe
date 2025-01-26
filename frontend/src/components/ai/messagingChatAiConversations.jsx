import { Icon } from '@iconify/react';

const messagingChatAiConversations = [
  {
    avatar: (
      <Icon className="text-default-600" icon="ri:apps-2-ai-line" width={26} />
    ),
    message: 'How can I help you today?',
  },
  {
    avatar: (
      <Icon className="text-default-600" icon="ph:user-sound-bold" width={26} />
    ),
    message:
      'Make a prediction on how launching an advertising campaign will impact the website’s conversion rate this month',
    isRTL: true,
  },
  {
    avatar: (
      <Icon className="text-default-600" icon="ri:apps-2-ai-line" width={26} />
    ),
    message:
      'Of course, I will show you graphs illustrating how the launch of advertising may impact the number of conversions this month.' +
      '\n\n' +
      'On the graph, you can see the percentage increase in conversions and website traffic.' +
      '\n\n' +
      'I will also show you from which platform, in my opinion, there will be the most traffic.',
  },
  {
    avatar: (
      <Icon className="text-default-600" icon="ph:user-sound-bold" width={26} />
    ),
    message: 'Thank you!',
    isRTL: true,
  },
];

export default messagingChatAiConversations;
