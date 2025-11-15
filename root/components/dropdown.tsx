"use client";

import React from 'react';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormHelperText } from '@mui/material';

type Option = { value: string; label: string };

interface DropdownProps {
    id: string;
    label?: string;
    options: Option[];
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    fullWidth?: boolean;
    required?: boolean;
    placeholder?: string; 
    helperText?: string;
    error?: boolean;
}

export default function Dropdown({
    id,
    label = 'Select',
    options,
    value,
    onChange,
    fullWidth = true,
    required = false,
    placeholder,
    helperText,
    error = false,
}: DropdownProps) {
    const labelId = `${id}-label`;
    const showError = error || (required && value === '');

    return (
        <Box sx={{ m: 1, width: '100%' }}>
            <FormControl fullWidth={fullWidth} required={required} error={showError}>
                <InputLabel id={labelId}>{label}</InputLabel>
                <Select
                    labelId={labelId}
                    id={id}
                    value={value}
                    label={label}
                    onChange={onChange}
                    displayEmpty={Boolean(placeholder)}
                >
                    {placeholder && (
                        <MenuItem value="" disabled={required}>
                            {placeholder}
                        </MenuItem>
                    )}
                    {options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>
                {(helperText || (required && value === '')) && (
                    <FormHelperText>{helperText ?? (required && value === '' ? 'Required' : '')}</FormHelperText>
                )}
            </FormControl>
        </Box>
    );
}