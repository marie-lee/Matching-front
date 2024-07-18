import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  useTheme,
} from '@mui/material';
import { PORTFOLIOS, PROFILE } from '@/pages/profile/constants';
import CloseIcon from '@mui/icons-material/Close';
import RealPortfolioList from './portfolio';
import RealProfile from './profile';

const ProfilePreview = ({ onOpen, profileEditForm }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false); // 팝업 상태 관리

  const handleClickOpen = () => {
    setOpen(true); // 팝업 열기

    console.log('profileEditForm', profileEditForm.getValues());

    if (onOpen) {
      onOpen(); // 부모 컴포넌트로 이벤트 전달
    }
  };

  const handleClose = () => {
    setOpen(false); // 팝업 닫기
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ borderRadius: '4px' }}
        onClick={handleClickOpen} // 미리보기 버튼 클릭 이벤트
      >
        미리보기
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'lg'}>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            프로필 미리보기
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent
          sx={{ backgroundColor: theme.palette.background.neutral }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <RealProfile profile={PROFILE} />
            </Grid>
            <Grid item xs={12} md={8}>
              <RealPortfolioList portfolio={PORTFOLIOS} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePreview;
