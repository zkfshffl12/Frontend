import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatApi, ChatRoom } from '../../../modules/chat/apis';
import Layout from '../../../commons/components/layouts';

const ChatListPage: React.FC = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadChatRooms();
  }, []);

  const loadChatRooms = async () => {
    try {
      const rooms = await chatApi.getChatList();
      setChatRooms(rooms);
    } catch (err: any) {
      setError(err.message || 'Failed to load chat rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleRoomClick = (roomId: string) => {
    navigate(`/chat/room/${roomId}`);
  };

  const handleFindMatch = () => {
    navigate('/user/match');
  };

  if (loading) {
    return (
      <Layout title="Chat Rooms">
        <div>Loading chat rooms...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Chat Rooms">
      <div className="chat-list-page">
        <div className="chat-list-header">
          <h2>Your Chat Rooms</h2>
          <button 
            onClick={handleFindMatch}
            className="find-match-button"
          >
            Find New Match
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="chat-rooms">
          {chatRooms.length === 0 ? (
            <div className="no-chats">
              <p>No chat rooms yet. Find a match to start chatting!</p>
              <button 
                onClick={handleFindMatch}
                className="find-match-button"
              >
                Find Match
              </button>
            </div>
          ) : (
            chatRooms.map((room) => (
              <div 
                key={room.id} 
                className="chat-room-item"
                onClick={() => handleRoomClick(room.id)}
              >
                <div className="room-info">
                  <h3>{room.name}</h3>
                  {room.lastMessage && (
                    <p className="last-message">{room.lastMessage.content}</p>
                  )}
                </div>
                {room.unreadCount > 0 && (
                  <div className="unread-badge">{room.unreadCount}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChatListPage; 