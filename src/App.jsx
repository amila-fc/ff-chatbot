import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

function App() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden',
        bgcolor: '#1F1F1F'
      }}
    >
      <Sidebar />
      <ChatArea />
    </Box>
  );
}

export default App;
