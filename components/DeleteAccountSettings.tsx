'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { CRIMSON_PRIMARY, CRIMSON_HOVER } from '@/lib/constants';

export default function DeleteAccountSettings() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleConfirmDelete = () => {
    console.log('Account deletion confirmed');
    setOpenDialog(false);
  };

  return(
    <Box>
      <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
      <Button 
        variant="contained"
        onClick={handleOpenDialog}
        sx={{ m: 1, width: '25ch', backgroundColor: CRIMSON_PRIMARY, '&:hover': { backgroundColor: CRIMSON_HOVER } }}
      >
        Delete Account
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete Your Account?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is permanent. Your account and all associated data will be deleted. An email confirmation will be sent before the deletion is finalized.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleConfirmDelete} 
            autoFocus 
            variant="contained"
            sx={{ backgroundColor: CRIMSON_PRIMARY, '&:hover': { backgroundColor: CRIMSON_HOVER } }}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}