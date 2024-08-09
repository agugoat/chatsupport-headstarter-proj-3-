import { useState, useRef, useEffect, useContext } from 'react';
import Message from './messages';
import { ChatContext } from './chatContext';
import Thinking from './thinking';

const options = ['ChatGPT', 'DALL·E'];
const gptModel = ['gpt-3.5-turbo', 'gpt-4'];
const template = [
  { title: 'Plan a trip', prompt: 'I want to plan a trip to New York City.' },
  { title: 'How to make a cake', prompt: 'How to make a cake with chocolate and strawberries?' },
  { title: 'Business ideas', prompt: 'Generate 5 business ideas for a new startup company.' },
  { title: 'What is recursion?', prompt: 'What is recursion? Show me an example in Python.' },
];

const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [thinking, setThinking] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [gpt, setGpt] = useState(gptModel[0]);
  const [messages, setMessages] = useContext(ChatContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateMessage = (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id,
      createdAt: Date.now(),
      text: newValue,
      ai,
      selected,
    };
    setMessages((prevMessages) => [...prevMessages, newMsg]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const cleanPrompt = formValue.trim();
    if (!cleanPrompt) return; // Prevent sending empty messages

    const aiModel = selected;

    setThinking(true);
    setFormValue('');
    updateMessage(cleanPrompt, false, aiModel);

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: cleanPrompt }]),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let responseText = ''; // Accumulate the full response text here

      const processText = async ({ done, value }) => {
        if (done) {
          updateMessage(responseText, true, aiModel); // Update with the full accumulated text
          return;
        }

        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        responseText += text; // Accumulate text

        // Continue reading the next chunk of the response
        return reader.read().then(processText);
      };

      // Start reading the response
      await reader.read().then(processText);

    } catch (err) {
      console.error(`Error: ${err}`);
      updateMessage("I'm sorry, but I encountered an error. Please try again later.", true, aiModel);
    } finally {
      setThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage(e);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <main className='relative flex flex-col h-screen p-1 overflow-hidden dark:bg-light-grey'>
      <div className='mx-auto my-4 tabs tabs-boxed w-fit'>
        <button onClick={() => setGpt(gptModel[0])} className={`${gpt === gptModel[0] && 'tab-active'} tab`}>
          GPT-3.5
        </button>
        <button onClick={() => setGpt(gptModel[1])} className={`${gpt === gptModel[1] && 'tab-active'} tab`}>
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
                    className='p-6 border rounded-lg border-slate-300 hover:border-slate-500'>
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
      <form className='flex flex-col px-10 mb-2 md:px-32 join sm:flex-row' onSubmit={sendMessage}>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className='w-full sm:w-40 select select-bordered join-item'>
          <option>{options[0]}</option>
          <option>{options[1]}</option>
        </select>
        <div className='flex items-stretch justify-between w-full'>
          <textarea
            ref={inputRef}
            className='w-full grow input input-bordered join-item max-h-[20rem] min-h-[3rem]'
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button type='submit' className='join-item btn' disabled={!formValue}>
            Send
          </button>
        </div>
      </form>
    </main>
  );
};

export default ChatView;
