"use client";

import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

interface InputProps {
    id: string;
    label?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    fullWidth?: boolean;
    required?: boolean;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    multiline?: boolean;
    rows?: number;
}

export default function Input({ 
    id,
    label = 'Input',
    value,
    onChange,
    fullWidth = true,
    required = false,
    placeholder,
    helperText,
    error = false,
    multiline = false,
    rows,
}: InputProps) {
    const showError = error || (required && value === '');
    
  return (
    <Box sx={{ m: 1, width: '100%' }}>
        <FormControl fullWidth={fullWidth} required={required} error={showError}>
            <TextField
                required={required}
                id={id}
                label={label}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                fullWidth={fullWidth}
                error={showError}
                helperText={helperText}
                multiline={multiline}
                rows={rows}
            />
        </FormControl>
    </Box>
)}