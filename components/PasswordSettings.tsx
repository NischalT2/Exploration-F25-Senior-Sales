'use client';

import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CRIMSON_PRIMARY, CRIMSON_HOVER } from '@/lib/constants';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function PasswordInput({ id, label, value, onChange }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{
        m: 1,
        width: '25ch',
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: CRIMSON_PRIMARY,
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: CRIMSON_PRIMARY,
        },
      }}
      variant="outlined"
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'hide the password' : 'display the password'}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
}

export default function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChangePassword = () => {
    // Clear previous messages
    setError('');
    setSuccess(false);

    // Validation checks
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation password do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password');
      return;
    }

    // If all checks pass, submit the password change
    console.log('Password change submitted');
    setSuccess(true);
    
    // Clear form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Password changed successfully!</Alert>}
      
      <PasswordInput 
        id="current-password" 
        label="Current Password" 
        value={currentPassword}
        onChange={setCurrentPassword}
      />
      <PasswordInput 
        id="new-password" 
        label="New Password" 
        value={newPassword}
        onChange={setNewPassword}
      />
      <PasswordInput 
        id="confirm-password" 
        label="Confirm Password" 
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      
      <Button 
        variant="contained" 
        onClick={handleChangePassword}
        sx={{ m: 1, width: '25ch', backgroundColor: CRIMSON_PRIMARY, '&:hover': { backgroundColor: CRIMSON_HOVER } }}
      >
        Change Password
      </Button>
    </Box>
  );
}
