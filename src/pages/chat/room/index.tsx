import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Chat from '../../../modules/chat/components/chat';
import Layout from '../../../commons/components/layouts';

const ChatRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  if (!roomId) {
    return (
      <Layout title="Chat Room">
        <div className="error">Room ID is required</div>
      </Layout>
    );
  }

  const handleBackToChatList = () => {
    navigate('/chat/list');
  };

  return (
    <Layout title="Chat Room">
      <div className="chat-room-page">
        <div className="chat-room-header">
          <button 
            onClick={handleBackToChatList}
            className="back-button"
          >
            ← Back to Chat List
          </button>
        </div>
        <Chat roomId={roomId} />
      </div>
    </Layout>
  );
};

export default ChatRoomPage; 