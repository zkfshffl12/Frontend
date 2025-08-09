import React, { useState, useEffect } from 'react';
import { chatApi, ChatMessage, ChatRoom } from '../../apis';

interface ChatProps {
  roomId: string;
}

const Chat: React.FC<ChatProps> = ({ roomId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadChatRoom();
  }, [roomId]);

  const loadChatRoom = async () => {
    setLoading(true);
    try {
      const data = await chatApi.getChatRoom(roomId);
      setRoom(data.room);
      setMessages(data.messages);
    } catch (err: any) {
      setError(err.message || 'Failed to load chat room');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const message = await chatApi.sendMessage({
        roomId,
        content: newMessage,
      });
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    }
  };

  if (loading) {
    return <div>Loading chat room...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="chat-container">
      {room && (
        <div className="chat-header">
          <h3>{room.name}</h3>
        </div>
      )}
      
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-header">
              <span className="sender">{message.senderName}</span>
              <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat; 