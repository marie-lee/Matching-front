import { IconButton, Box } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help'; 
import { useState } from 'react';
import GuidePopup from '@/pages/guide/guide-popup-page';

const FloatingButton = ({ initialTab }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
        }}
      >
        <IconButton
          onClick={handleOpen}
          sx={{
            backgroundColor: '#6B6C6D',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#555454',
            },
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
          }}
        >
          <HelpIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </Box>

      {/* GuidePopup */}
      <GuidePopup open={open} onClose={handleClose} initialTab={initialTab} showCheckbox={false} />
    </>
  );
};

export default FloatingButton;
