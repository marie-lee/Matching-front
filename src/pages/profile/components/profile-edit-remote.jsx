import React from 'react';
import { Button, Stack } from '@mui/material';
import ProfilePreview from './profile-edit-preview';

const RemoteControlBox = ({ onOpen }) => {
  return (
    <Stack p={2} spacing={4} bgcolor={'background.default'}>
      <Stack spacing={1}>
        <Button variant="outlined" color="primary" sx={{ borderRadius: '4px' }}>
          경력
        </Button>
        <Button variant="outlined" color="primary" sx={{ borderRadius: '4px' }}>
          주요 스킬
        </Button>
        <Button variant="outlined" color="primary" sx={{ borderRadius: '4px' }}>
          관심분야
        </Button>
        <Button variant="outlined" color="primary" sx={{ borderRadius: '4px' }}>
          링크
        </Button>
        <Button variant="outlined" color="primary" sx={{ borderRadius: '4px' }}>
          포트폴리오
        </Button>
      </Stack>

      <Stack spacing={1}>
        <ProfilePreview onOpen={onOpen}></ProfilePreview>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: '4px' }}
        >
          저장
        </Button>
      </Stack>
    </Stack>
  );
};

export default RemoteControlBox;
