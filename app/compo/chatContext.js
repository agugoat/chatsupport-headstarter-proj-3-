import { createContext, useContext, useState } from 'react';

export const ChatContext = createContext();  // This is the export you're trying to use

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const clearChat = () => {
    setMessages([]);
  };
  
  const updateLastMessage = (updatedContent) => {
    setMessages((prevMessages) => {
      const lastMessageIndex = prevMessages.length - 1;
      return prevMessages.map((msg, index) =>
        index === lastMessageIndex ? { ...msg, content: updatedContent } : msg
      );
    });
  };

  return (
    <ChatContext.Provider value={[messages, addMessage, clearChat, updateLastMessage]}>
      {children}
    </ChatContext.Provider>
  );
};

