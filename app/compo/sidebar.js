import React, { useState } from 'react';

const SideBar = ({ handleClearChat, setShowSettings, showSettings }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex flex-col h-screen bg-black ${open ? 'w-72' : 'w-16'} shadow-md transition-all duration-300`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button className="btn btn-ghost btn-square text-gray-200 border-white hover:bg-gray-800" onClick={() => setOpen(!open)}>
            {open ? 'X' : '≡'} {/* Text-based toggle instead of icons */}
          </button>
          {open && (
            <span className="ml-2 text-xl font-bold text-gray-200 border-white hover:bg-gray-800">Assistant GPT</span>
          )}
        </div>
      </div>

      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          <li>
            <button className="btn btn-block btn-outline text-gray-200 border-white hover:bg-gray-800" onClick={handleClearChat}>
              🗑 {/* Generic trash icon using emoji */}
              {open && <span className="ml-2">Clear Chat</span>}
            </button>
          </li>
          <li>
            <a href="https://github.com/agugoat/chatsupport-headstarter-proj-3-" target="_blank" rel="noopener noreferrer" className="btn btn-block btn-outline text-blue-500 border-white hover:bg-gray-800">
              🌐 {/* Generic globe icon using emoji */}
              {open && <span className="ml-2">GitHub</span>}
            </a>
          </li>
        </ul>
      </nav>

      <div className="p-4">
        {/* Assuming ToggleTheme is a component you want to include */}
      </div>

      {showSettings && (
        <div className="p-4">
          {/* Assuming Setting is a component you want to include */}
        </div>
      )}
    </div>
  );
};

export default SideBar;