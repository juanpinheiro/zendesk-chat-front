import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function Conversation({ userId, token }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]);

  // Fetch conversations
  const fetchConversations = () => {
    axios
      .get('http://localhost:5000/conversations', {
        params: { userId },
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setConversations(response.data.conversations);
      })
      .catch((error) => {
        console.error('Error fetching conversations:', error);
      });
  };

  // Fetch messages in a conversation
  const fetchMessages = (conversationId) => {
    axios
      .get(
        `http://localhost:5000/conversations/${conversationId}/messages`,
        {
          params: { userId },
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // Handle sending a message
  const handleSendMessage = (text) => {
    axios
      .post(
        `http://localhost:5000/conversations/${selectedConversationId}/messages`,
        { userId, text }, {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(() => {
        fetchMessages(selectedConversationId);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  // Handle conversation selection
  const handleConversationSelect = (conversationId) => {
    setSelectedConversationId(conversationId);
    fetchMessages(conversationId);
  };

  // Handle creating a new conversation
  const handleCreateConversation = () => {
    axios
      .post('http://localhost:5000/conversations', { userId }, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const newConversation = response.data.conversation;
        setConversations([...conversations, newConversation]);
        handleConversationSelect(newConversation.id);
      })
      .catch((error) => {
        console.error('Error creating conversation:', error);
      });
  };


  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-white p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        <button
          onClick={handleCreateConversation}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-4"
        >
          New Conversation
        </button>
        <ul>
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className={`p-2 cursor-pointer break-words ${
                selectedConversationId === conv.id
                  ? 'bg-blue-100'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => handleConversationSelect(conv.id)}
            >
              {conv.displayName || `Conversation ${conv.id}`}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 flex flex-col">
        {selectedConversationId ? (
          <>
            <header className="bg-blue-500 text-white p-4">
              <h1 className="text-xl font-bold">
                Conversation {selectedConversationId}
              </h1>
            </header>
            <div className="flex-1 overflow-auto p-4 bg-gray-200">
              <MessageList messages={messages} />
            </div>
            <footer className="p-4 bg-white">
              <MessageInput onSendMessage={handleSendMessage} />
            </footer>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a conversation to start</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Conversation;
