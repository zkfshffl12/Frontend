import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import pages
import SignInPage from './pages/user/signIn';
import SignUpPage from './pages/user/signUp';
import MatchPage from './pages/user/match';
import ChatListPage from './pages/chat/list';
import ChatRoomPage from './pages/chat/room';
import NotionPage from './pages/notion';
import PingPongTestPage from './pages/pingpong';

// Import store
import { useAuthStore } from './stores/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={!isAuthenticated ? <SignInPage /> : <Navigate to="/chat/list" />} />
          <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/chat/list" />} />
          
          {/* Protected routes */}
          <Route path="/user/match" element={isAuthenticated ? <MatchPage /> : <Navigate to="/signin" />} />
          <Route path="/chat/list" element={isAuthenticated ? <ChatListPage /> : <Navigate to="/signin" />} />
          <Route path="/chat/room/:roomId" element={isAuthenticated ? <ChatRoomPage /> : <Navigate to="/signin" />} />
          <Route path="/notion" element={isAuthenticated ? <NotionPage /> : <Navigate to="/signin" />} />
          <Route path="/pingpong" element={isAuthenticated ? <PingPongTestPage /> : <Navigate to="/signin" />} />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/chat/list" : "/signin"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 