'use client';

import { useEffect, useState } from 'react';
import NotificationSettings from '@/components/NotificationSettings';
import PasswordSettings from '@/components/PasswordSettings';
import DeleteAccountSettings from '@/components/DeleteAccountSettings';
import ProfileView from '@/components/ProfileView';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CRIMSON_PRIMARY, CRIMSON_HOVER } from '@/lib/constants';

type TabOption = 'settings' | 'profile';
const TAB_STORAGE_KEY = 'settingsActiveTab';

const CrimsonToggleButton = styled(ToggleButton)(() => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  minWidth: 140,
  borderColor: CRIMSON_PRIMARY,
  color: CRIMSON_PRIMARY,
  '&:hover': {
    borderColor: CRIMSON_HOVER,
    color: CRIMSON_HOVER,
  },
  '&.Mui-selected': {
    backgroundColor: CRIMSON_PRIMARY,
    color: '#fff',
    '&:hover': {
      backgroundColor: CRIMSON_HOVER,
      borderColor: CRIMSON_HOVER,
    },
  },
}));

export default function Settings() {
  const [tab, setTab] = useState<TabOption>('settings');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(TAB_STORAGE_KEY) as TabOption | null;
      if (saved === 'settings' || saved === 'profile') {
        queueMicrotask(() => setTab(saved));
      }
    } catch (error) {
      console.error('Failed to restore tab preference:', error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(TAB_STORAGE_KEY, tab);
    } catch (error) {
      console.error('Failed to persist tab preference:', error);
    }
  }, [tab]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: TabOption | null,
  ) => {
    if (newValue) {
      setTab(newValue);
    }
  };
  return (
    <div className="flex flex-col min-h-screen items-center p-6">
      <ToggleButtonGroup
        value={tab}
        exclusive
        onChange={handleChange}
        aria-label="Settings Tabs"
        className="mb-6"
      >
        <CrimsonToggleButton value="profile">Profile</CrimsonToggleButton>
        <CrimsonToggleButton value="settings">Settings</CrimsonToggleButton>
      </ToggleButtonGroup>

      {tab === 'settings' ? (
        <div className="w-full max-w-8xl flex flex-col gap-8 mt-6">
          <div className="border-2 border-[#A51C30] rounded-lg p-6 shadow-sm">
            <NotificationSettings />
          </div>
          <div className="border-2 border-[#A51C30] rounded-lg p-6 shadow-sm">
            <PasswordSettings />
          </div>
          <div className="border-2 border-[#A51C30] rounded-lg p-6 shadow-sm">
            <DeleteAccountSettings />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-8xl mt-6 border-2 border-[#A51C30] rounded-lg p-6 shadow-sm">
          <ProfileView />
        </div>
      )}
    </div>
  );
}