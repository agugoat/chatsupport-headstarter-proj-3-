'use client';

import React, { useState, useRef, useEffect } from 'react';
import SideBar from '../compo/sidebar'; // Import the SideBar component
import SignIn from '../signin/page';

const Message = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.role === 'assistant' ? 'justify-start' : 'justify-end'
      } my-2`}
    >
      <div
        className={`${
          message.role === 'assistant' ? 'bg-gray-700' : 'bg-gray-600'
        } text-white p-4 rounded-lg max-w-lg`}
      >
        {message.content}
      </div>
    </div>
  );
};

const Thinking = () => (
  <div className="flex justify-center my-4">
    <div className="text-gray-400">Thinking...</div>
  </div>
);

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [gpt, setGpt] = useState('GPT-3.5'); // Initialize GPT model state
  const [formValue, setFormValue] = useState('');
  const [thinking, setThinking] = useState(false);
  const [selected, setSelected] = useState('Option 1');
  const [showSettings, setShowSettings] = useState(false); // State for sidebar settings
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const gptModel = ['GPT-3.5', 'GPT-4'];
  const options = ['Chat Here'];
  const template = [
    { title: 'Make a Plan', prompt: 'Help me make a plan for today?' },
    { title: 'Bake a cake', prompt: 'How can I bake a chocolate cake?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setIsAuthenticated(true);
      setEmail(userEmail);
    }
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue.trim() || isLoading) return;
    setIsLoading(true);
    setThinking(true);

    setMessages((messages) => [
      ...messages,
      { role: 'user', content: formValue },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: formValue }]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        {
          role: 'assistant',
          content: "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setThinking(false);
      setFormValue(''); // Clear the input field
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  if (!isAuthenticated) {
    return <SignIn />
  }

  return (
    <div className="flex h-screen">
      <SideBar handleClearChat={handleClearChat} setShowSettings={setShowSettings} showSettings={showSettings} />

      <main className='relative flex flex-col flex-grow p-1 overflow-hidden bg-gray-900'>
        <p className='mx-auto text-white text-right'>
          {email}
        </p>
        
        <div className='mx-auto my-4 tabs tabs-boxed w-fit'>
          <button onClick={() => setGpt(gptModel[0])} className={`${gpt === gptModel[0] && 'tab-active'} tab text-white bg-gray-800`}>
            GPT-3.5
          </button>
          <button onClick={() => setGpt(gptModel[1])} className={`${gpt === gptModel[1] && 'tab-active'} tab text-white bg-gray-800`}>
            GPT-4
          </button>
        </div>

        <section className='flex flex-col flex-grow w-full px-4 overflow-y-scroll sm:px-10 md:px-32'>
          {messages.length ? (
            messages.map((message, index) => <Message key={index} message={message} />)
          ) : (
            <div className='flex my-2'>
              <div className='w-screen overflow-hidden'>
                <ul className='grid grid-cols-2 gap-2 mx-10'>
                  {template.map((item, index) => (
                    <li
                      onClick={() => setFormValue(item.prompt)}
                      key={index}
                      className='p-6 border rounded-lg border-gray-600 hover:border-gray-400 text-white'>
                      <p className='text-base font-semibold'>{item.title}</p>
                      <p className='text-sm'>{item.prompt}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {thinking && <Thinking />}

          <span ref={messagesEndRef}></span>
        </section>

        {/* Response Box Section */}
        <form className='flex flex-col px-10 mb-2 md:px-32 join sm:flex-row' onSubmit={sendMessage}>
        <div
            className='sm:w-40 bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 flex-auto text-center'

>
  {options[0]}
</div>
          <div className='flex items-stretch justify-between w-full'>

            {/* Textarea - Change colors here */}
            <textarea
              ref={inputRef}
              className='w-full grow input input-bordered join-item max-h-[20rem] min-h-[3rem] bg-gray-600 text-white border-gray-200'
              value={formValue}
              onKeyDown={handleKeyDown}
              onChange={(e) => setFormValue(e.target.value)}
            />

            {/* Send Button - Change colors here */}
            <button type='submit' className='join-item btn bg-blue-700 text-white border-black-600 hover:bg-blue-600' disabled={!formValue}>
              Send
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}