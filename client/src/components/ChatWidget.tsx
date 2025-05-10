import { useEffect } from 'react';
import { createChat } from 'ai-chat-widget-agionic';

export default function ChatWidget() {
  useEffect(() => {
    // The user ID provided in the initial request
    createChat('13c94313-83e0-41de-b3ae-2f3abec5acc5');
  }, []);

  // The component doesn't render anything, it just initializes the chat widget
  return null;
}