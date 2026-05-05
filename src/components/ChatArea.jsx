import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  IconButton, 
  InputBase,
  CircularProgress,
  alpha
} from '@mui/material';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreHorizontal, 
  Image as ImageIcon,
  Type,
  Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ChatArea = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'AI Chatbot', 
      text: 'Hello! I am your Star Concord AI assistant. How can I help you today?', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      isBot: true 
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Refocus input whenever loading finishes
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'You',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBot: false,
    };

    // Keep only the last 29 messages to make room for the new user message
    const currentHistory = messages.slice(-29);
    const updatedMessages = [...currentHistory, userMsg];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(BACKEND_URL, {
        messages: updatedMessages.map(m => ({
          role: m.isBot ? 'assistant' : 'user',
          content: m.text
        }))
      });

      const botText = response.data.choices[0].message.content;

      const botMsg = {
        id: Date.now() + 1,
        sender: 'AI Chatbot',
        text: botText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: true,
      };

      setMessages(prev => [...prev, botMsg].slice(-30));
    } catch (error) {
      console.error('Backend Error:', error);
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'System',
        text: 'Sorry, I encountered an error connecting to the backend router. Please ensure the server is running.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: true,
        isError: true
      };
      setMessages(prev => [...prev, errorMsg].slice(-30));
    } finally {
      setIsLoading(false);
    }
  };

  const MarkdownRenderer = ({ content, isBot }) => {
    return (
      <Box 
        sx={{ 
          '& p': { m: 0, mb: 1, '&:last-child': { mb: 0 } },
          '& a': { color: isBot ? '#4FA8FF' : '#FFF', textDecoration: 'underline' },
          '& code': { 
            bgcolor: alpha('#000', 0.2), 
            p: '2px 4px', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.9em'
          },
          '& pre': { 
            bgcolor: alpha('#000', 0.3), 
            p: 1.5, 
            borderRadius: '8px',
            overflowX: 'auto',
            my: 1,
            '& code': { bgcolor: 'transparent', p: 0 }
          },
          '& ul, & ol': { pl: 2, m: 0, my: 1 },
          '& li': { mb: 0.5 },
          '& table': { borderCollapse: 'collapse', width: '100%', my: 1 },
          '& th, & td': { border: '1px solid #444', p: 1 },
          '& blockquote': { borderLeft: '3px solid #6264A7', pl: 1.5, m: 0, my: 1, color: '#ADADAD' }
        }}
      >
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
        >
          {content}
        </ReactMarkdown>
      </Box>
    );
  };

  return (
    <Box sx={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1F1F1F' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #3B3B3B', bgcolor: '#242424' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: '#6264A7', width: 32, height: 32 }}>AI</Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>Star Concord Agent</Typography>
            <Typography variant="caption" sx={{ color: '#00B0F0', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: '#00B0F0', borderRadius: '50%' }} /> Active
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" sx={{ color: '#ADADAD' }}><MoreHorizontal size={18} /></IconButton>
        </Box>
      </Box>

      {/* Messages */}
      <Box 
        ref={scrollRef}
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          p: 3, 
          paddingBottom: 1,
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2 
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ 
                alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                display: 'flex',
                gap: '12px',
                flexDirection: msg.isBot ? 'row' : 'row-reverse'
              }}
            >
              {msg.isBot && <Avatar sx={{ width: 28, height: 28, bgcolor: '#6264A7', fontSize: '0.75rem' }}>AI</Avatar>}
              <Box sx={{ maxWidth: 'calc(100% - 40px)' }}>
                {!msg.isBot && <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mb: 0.5, color: '#ADADAD' }}>{msg.time}</Typography>}
                {msg.isBot && <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#ADADAD' }}>{msg.sender} {msg.time}</Typography>}
                <Paper
                  elevation={0}
                  sx={{
                    p: '8px 12px',
                    bgcolor: msg.isError ? '#D32F2F' : (msg.isBot ? '#2B2B2B' : '#6264A7'),
                    color: '#FFF',
                    borderRadius: 2,
                    borderTopLeftRadius: msg.isBot ? 0 : 2,
                    borderTopRightRadius: msg.isBot ? 2 : 0,
                  }}
                >
                  <MarkdownRenderer content={msg.text} isBot={msg.isBot} />
                </Paper>
              </Box>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
            >
              <Avatar sx={{ width: 28, height: 28, bgcolor: '#6264A7', fontSize: '0.75rem' }}>AI</Avatar>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <CircularProgress size={16} sx={{ color: '#6264A7' }} />
                <Typography variant="caption" sx={{ color: '#ADADAD' }}>Thinking...</Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, pt: 1, borderTop: '1px solid #3B3B3B' }}>
        <Paper
          elevation={0}
          sx={{
            p: '8px 12px',
            bgcolor: '#2B2B2B',
            borderRadius: 2,
            border: '1px solid #3B3B3B',
            '&:focus-within': { borderColor: '#6264A7' },
            mb: 1
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
             {/* <IconButton size="small" sx={{ color: '#ADADAD' }}><Type size={16} /></IconButton>
             <IconButton size="small" sx={{ color: '#ADADAD' }}><Paperclip size={16} /></IconButton>
             <IconButton size="small" sx={{ color: '#ADADAD' }}><Smile size={16} /></IconButton>
             <IconButton size="small" sx={{ color: '#ADADAD' }}><ImageIcon size={16} /></IconButton> */}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <InputBase
              inputRef={inputRef}
              multiline
              maxRows={4}
              placeholder="Type a message"
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              sx={{ flex: 1, color: '#FFF', fontSize: '0.875rem' }}
            />
            <IconButton 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              sx={{ 
                color: (input.trim() && !isLoading) ? '#6264A7' : '#555',
                padding: '4px'
              }}
            >
              <Send size={20} />
            </IconButton>
          </Box>
        </Paper>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            textAlign: 'center', 
            color: '#666', 
            fontSize: '0.7rem',
            mt: 0.5
          }}
        >
          © copyright amilasilva88
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatArea;
