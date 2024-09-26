import React from 'react';

function MessageList({ messages }) {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className="mb-2">
          <div
            className={`p-2 rounded ${
              message.author.type === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-300 text-black self-start'
            }`}
          >
            {message.content.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
