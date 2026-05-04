import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  IconButton,
  InputBase,
  alpha
} from '@mui/material';
import { Search, Filter, Edit } from 'lucide-react';

const chats = [
  { id: 1, name: 'AI Chatbot', lastMsg: 'How can I help you today?', time: '12:45 PM', unread: true },
  { id: 2, name: 'Design Team', lastMsg: 'The mockup is ready.', time: '11:20 AM' },
  { id: 3, name: 'General Support', lastMsg: 'Ticket #452 has been resolved.', time: 'Yesterday' },
  { id: 4, name: 'Project Alpha', lastMsg: 'Meeting at 3 PM.', time: 'Monday' },
];

const ChatList = () => {
  return (
    <Box
      sx={{
        width: 300,
        height: '100%',
        bgcolor: '#2B2B2B',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #3B3B3B',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Chat</Typography>
        <Box>
          <IconButton size="small" sx={{ color: '#ADADAD' }}><Filter size={18} /></IconButton>
          <IconButton size="small" sx={{ color: '#ADADAD' }}><Edit size={18} /></IconButton>
        </Box>
      </Box>

      <Box sx={{ px: 2, mb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#1F1F1F',
            borderRadius: 1,
            px: 1,
            height: 32,
            border: '1px solid #3B3B3B',
          }}
        >
          <Search size={16} color="#ADADAD" />
          <InputBase
            placeholder="Search"
            sx={{ ml: 1, flex: 1, fontSize: '0.875rem', color: '#FFF' }}
          />
        </Box>
      </Box>

      <List sx={{ flex: 1, overflowY: 'auto', py: 0 }}>
        {chats.map((chat) => (
          <ListItem
            key={chat.id}
            button
            sx={{
              py: 1.5,
              borderLeft: chat.id === 1 ? '3px solid #6264A7' : '3px solid transparent',
              bgcolor: chat.id === 1 ? alpha('#6264A7', 0.1) : 'transparent',
              '&:hover': { bgcolor: '#333333' },
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: chat.id === 1 ? '#6264A7' : '#555', width: 36, height: 36 }}>
                {chat.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: chat.unread ? 700 : 400, noWrap: true }}>
                    {chat.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#ADADAD' }}>
                    {chat.time}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: chat.unread ? '#FFF' : '#ADADAD',
                    fontWeight: chat.unread ? 600 : 400,
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 180
                  }}
                >
                  {chat.lastMsg}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatList;
