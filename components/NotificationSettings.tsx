'use client';

import { useEffect, useState } from 'react';
import { Box, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';

const NotificationCheckbox = styled(Checkbox)({
  color: '#A51C30',
  '&.Mui-checked': {
    color: '#A51C30',
  },
});

export default function NotificationSettings() {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState({
    messages: true,
    offers: true,
    favorites: true,
  });

  // Load saved preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        queueMicrotask(() => setNotifications(parsed));
      } catch (e) {
        // If parsing fails, use defaults
        console.error('Failed to parse notification settings:', e);
      }
    }
    queueMicrotask(() => setMounted(true));
  }, []);

  // Save preferences whenever they change (only after mount)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    }
  }, [notifications, mounted]);

  const handleChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Don't render until localStorage is loaded
  if (!mounted) {
    return null;
  }

  return (
    <Box>
    <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
    <FormLabel component="legend">Email me when:</FormLabel>
    <FormGroup>
      <FormControlLabel 
        sx={{ mb: 0}} 
        control={<NotificationCheckbox checked={notifications.messages} onChange={() => handleChange('messages')} />} 
        label="Someone sends me a message" 
      />
      <FormControlLabel 
        sx={{ mb: 0}} 
        control={<NotificationCheckbox checked={notifications.offers} onChange={() => handleChange('offers')} />} 
        label="Someone sends me an offer" 
      />
      <FormControlLabel 
        sx={{ mb: 0}} 
        control={<NotificationCheckbox checked={notifications.favorites} onChange={() => handleChange('favorites')} />} 
        label="An update occurs for a favorited item" 
      />
    </FormGroup>
    </Box>
  );
}