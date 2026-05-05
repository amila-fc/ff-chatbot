import React from 'react';
import { Box, IconButton, Tooltip, Avatar, Badge } from '@mui/material';
import { 
  MessageSquare, 
  MoreHorizontal, 
  Plus,
  LayoutGrid
} from 'lucide-react';

const navItems = [
  { icon: MessageSquare, label: 'Chat', active: true },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 68,
        height: '100%',
        bgcolor: '#242424',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        borderRight: '1px solid #3B3B3B',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <IconButton sx={{ color: '#ADADAD' }}>
          <LayoutGrid size={24} />
        </IconButton>
      </Box>

      {navItems.map((item, index) => (
        <Tooltip key={index} title={item.label} placement="right">
          <IconButton
            sx={{
              color: item.active ? '#6264A7' : '#ADADAD',
              mb: 1,
              position: 'relative',
              '&::after': item.active ? {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '20%',
                bottom: '20%',
                width: 3,
                bgcolor: '#6264A7',
                borderRadius: '0 4px 4px 0',
              } : {},
            }}
          >
            <item.icon size={24} strokeWidth={item.active ? 2.5 : 2} />
          </IconButton>
        </Tooltip>
      ))}

      <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {/* <IconButton sx={{ color: '#ADADAD' }}>
          <Plus size={24} />
        </IconButton> */}
        {/* <IconButton sx={{ color: '#ADADAD' }}>
          <MoreHorizontal size={24} />
        </IconButton> */}
        <Avatar 
          sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: '#6264A7',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          AS
        </Avatar>
      </Box>
    </Box>
  );
};

export default Sidebar;
