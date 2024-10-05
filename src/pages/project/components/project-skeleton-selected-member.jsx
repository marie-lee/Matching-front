import React from 'react';
import {
  Stack,
  AppBar,
  Grid,
  Avatar,
  Typography,
  Button,
  Skeleton,
  Chip,
  Divider,
  Box,
} from '@mui/material';
import { HEADER } from '@/layouts/config-layout';
import SeletedMemberItemSkeleton from './project-skeleton-selected-member-portfolio';

const ProjectDetailsSelectedMemberSkeleton = () => {
  return (
    <Stack width={'100%'}>
      <AppBar
        position="sticky"
        color="default"
        sx={{
          height: '100vh',
          top: `${HEADER.H_DESKTOP + 24}px`,
          zIndex: (theme) => theme.zIndex.drawer - 101,
        }}
      >
        <Grid
          p={2}
          border={1}
          borderColor={'divider'}
          borderRadius={1}
          container
          bgcolor={'background.default'}
        >
          <Grid item container xs={12} md={'auto'} alignContent={'center'}>
            <Skeleton variant="circular" width={130} height={130} />
          </Grid>
          <Grid item container xs md={true} pl={2}>
            {/* 이름 및 요청 버튼 */}
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Skeleton width="40%" />
              <Button disabled>
                <Skeleton width={60} height={36} />
              </Button>
            </Grid>

            {/* 한 줄 소개 */}
            <Grid item container mt={1}>
              <Skeleton width="80%" />
              <Grid item container spacing={0.5} alignItems={'center'} mt={2}>
                <Grid item xs={12} sm={2} md={2}>
                  <Skeleton width="100%" />
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Skeleton width="100%" />
                </Grid>
                <Grid item xs={12} sm={2} md={2}>
                  <Skeleton width="100%" />
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Skeleton width="100%" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* 주요 스킬 */}
          <Grid item xs={12} mt={4}>
            <Skeleton width="20%" />
            <Grid container spacing={1} pt={1}>
              {Array.from(new Array(5)).map((_, index) => (
                <Grid item key={`stack_skeleton_${index}`}>
                  <Skeleton variant="rectangular" width={60} height={24} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* 경력 */}
          <Grid item xs={12} mt={4}>
            <Skeleton width="20%" />
            <Stack spacing={1} pt={1}>
              {Array.from(new Array(3)).map((_, index) => (
                <React.Fragment key={`career_skeleton_${index}`}>
                  <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                  </Stack>
                  <Divider />
                </React.Fragment>
              ))}
            </Stack>
          </Grid>
        </Grid>
        {/* 포트폴리오 */}
        <Box>
          <Grid item xs={12} mt={1}>
            <SeletedMemberItemSkeleton />
          </Grid>
        </Box>
      </AppBar>
    </Stack>
  );
};

export default ProjectDetailsSelectedMemberSkeleton;
