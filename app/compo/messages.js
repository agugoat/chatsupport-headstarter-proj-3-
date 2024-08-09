import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

const Message = ({ message }) => {
  const { id, createdAt, text, ai = false, selected } = message;

  return (
    <div
      key={id}
      className={`flex items-end my-2 gap-2 ${
        ai ? 'flex-row-reverse justify-end' : 'flex-row justify-end'
      }`}
    >
      {selected === 'DALL·E' && ai ? (
        <img src={text} alt="Generated" /> // Assuming the DALL·E response is an image URL
      ) : (
        <div
          className={`w-screen overflow-hidden chat ${
            ai ? 'chat-start' : 'chat-end'
          }`}
        >
          <div className="chat-bubble text-neutral-content">
            <ReactMarkdown>{text}</ReactMarkdown>
            <div className={`${ai ? 'text-left' : 'text-right'} text-xs`}>
              {moment(createdAt).calendar()}
            </div>
          </div>
        </div>
      )}

      <div className="avatar">
        <div className="w-8 border rounded-full border-slate-400">
          {ai ? (
            <span role="img" aria-label="AI">🤖</span>
          ) : (
            <span role="img" aria-label="User">👤</span>
          )}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    createdAt: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    ai: PropTypes.bool,
    selected: PropTypes.string,
  }).isRequired,
};

export default Message;