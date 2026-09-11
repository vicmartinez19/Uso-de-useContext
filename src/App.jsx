import React from 'react';
import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <ChatProvider>
      <div style={{ display: 'flex', height: '100vh', background: '#0b0f19' }}>
        <Sidebar />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}

export default App;