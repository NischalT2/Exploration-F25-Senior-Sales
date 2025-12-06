"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import Image from 'next/image';
import { CRIMSON_PRIMARY, CRIMSON_HOVER } from '@/lib/constants';

const PROFILE_STORAGE_KEY = 'profileInformation';
const PROFILE_IMAGE_STORAGE_KEY = 'profileAvatar';
const AVATAR_SIZE_PX = 300;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB
const PLACEHOLDER_IMAGE = '/profile-placeholder.svg';

const profileFields = [
  { id: 'name', label: 'Name', placeholder: 'John Harvard' },
  { id: 'email', label: 'Email', placeholder: 'johnharvard@college.harvard.edu.' },
  { id: 'phone', label: 'Phone Number', placeholder: '(617) 495-1000' },
  { id: 'residence', label: 'House / Dorm', placeholder: 'Lowell House' },
];

export default function ProfileView() {
  const defaultValues = useMemo(() => (
    profileFields.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = field.placeholder;
      return acc;
    }, {})
  ), []);

  const [formValues, setFormValues] = useState<Record<string, string> | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, string>;
        queueMicrotask(() => setFormValues({ ...defaultValues, ...parsed }));
        return;
      }
      queueMicrotask(() => setFormValues(defaultValues));
    } catch (error) {
      console.error('Failed to load profile info:', error);
      queueMicrotask(() => setFormValues(defaultValues));
    }
  }, [defaultValues]);

  useEffect(() => {
    try {
      const storedImage = window.localStorage.getItem(PROFILE_IMAGE_STORAGE_KEY);
      if (storedImage) {
        queueMicrotask(() => setImageSrc(storedImage));
        return;
      }
    } catch (error) {
      console.error('Failed to load profile image:', error);
    }
    queueMicrotask(() => setImageSrc(PLACEHOLDER_IMAGE));
  }, []);

  const handleChange = (fieldId: string, value: string) => {
    if (!formValues) {
      return;
    }
    setSaved(false);
    setFormValues((prev) => (prev ? { ...prev, [fieldId]: value } : prev));
  };

  const handleSave = () => {
    if (!formValues) {
      return;
    }
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(formValues));
      if (imageSrc) {
        window.localStorage.setItem(PROFILE_IMAGE_STORAGE_KEY, imageSrc);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save profile info:', error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setImageError('Image must be 2MB or smaller.');
      return;
    }

    setImageError(null);
    setSaved(false);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = AVATAR_SIZE_PX;
        canvas.height = AVATAR_SIZE_PX;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return;
        }
        const scale = Math.max(
          AVATAR_SIZE_PX / img.width,
          AVATAR_SIZE_PX / img.height,
        );
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const offsetX = (AVATAR_SIZE_PX - drawWidth) / 2;
        const offsetY = (AVATAR_SIZE_PX - drawHeight) / 2;
        ctx.clearRect(0, 0, AVATAR_SIZE_PX, AVATAR_SIZE_PX);
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        const squareDataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setImageSrc(squareDataUrl);
      };
      img.onerror = () => {
        setImageError('Could not load the selected image.');
      };
      img.src = dataUrl;
    };
    reader.onerror = () => setImageError('Failed to read the selected file.');
    reader.readAsDataURL(file);
  };

  if (!formValues || !imageSrc) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <button
        type="button"
        onClick={handleImageClick}
        className="rounded-full border-4 border-[#A51C30] shadow-sm focus:outline-none focus:ring-4 focus:ring-[#A51C30]/40"
        aria-label="Upload profile image"
      >
        <Image
          src={imageSrc}
          alt="Profile avatar"
          width={AVATAR_SIZE_PX}
          height={AVATAR_SIZE_PX}
          priority
          unoptimized
          className="rounded-full object-cover"
        />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          gap: 2,
          width: '100%',
        }}
      >
        {profileFields.map((field) => (
          <TextField
            key={field.id}
            id={field.id}
            label={field.label}
            value={formValues[field.id] ?? ''}
            placeholder={field.placeholder}
            onChange={(event) => handleChange(field.id, event.target.value)}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                borderColor: CRIMSON_PRIMARY,
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: CRIMSON_PRIMARY,
              },
            }}
          />
        ))}
      </Box>

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {imageError && (
          <Alert severity="error">{imageError}</Alert>
        )}
        {saved && (
          <Alert severity="success">Profile information saved.</Alert>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: CRIMSON_PRIMARY,
              '&:hover': { backgroundColor: CRIMSON_HOVER },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
}