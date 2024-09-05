import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { getProject } from '@/services/project';
import { ResponsiveImg } from '@/components/img';
import { useLocation } from 'react-router-dom';

const Group = ({ title, currentCnt, expectCnt }) => {
  const userInfo = [
    {
      part: 'Frontend',
      names: '한혜원, 박영희, 이민수',
    },
    {
      part: 'Backend',
      names: '홍길동, 김영수, 박철수',
    },
    {
      part: 'Design',
      names: '한혜원, 박영희, 이민수',
    },
  ];
  return (
    <Grid item xs={6}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        spacing={0.5}
        mb={0.5}
      >
        <Typography variant={'sm'}>{title}</Typography>
        <Typography variant={'sm'}>
          {currentCnt} / {expectCnt}
        </Typography>
      </Stack>
      <Box
        p={2}
        sx={{
          backgroundColor: (theme) => theme.palette.grey[300],
          minHeight: 56.75,
        }}
      >
        {userInfo.flatMap((user, index) => {
          if (user.part === title) {
            return user.names
              .split(', ')
              .map((name, nameIndex) => (
                <Chip
                  sx={{ mr: 0.5 }}
                  key={`${index}-${nameIndex}`}
                  avatar={<Avatar alt={`${name} 프로필 이미지`} />}
                  label={name}
                  size="small"
                  clickable
                />
              ));
          }
          return [];
        })}
      </Box>
    </Grid>
  );
};

// ----------------------------------------------------------------------

const MatchSelectedProject = ({ data }) => {
  const [userInfo, setUserInfo] = useState(null);

  if (!data) {
    return null;
  }

  return (
    <Stack>
      <Grid item container p={2} bgcolor={'background.default'}>
        <Grid item container spacing={4}>
          {/* 제목, 프로젝트명, 기간, 팀장, 이미지  */}
          <Grid item container>
            <Grid item xs={12} md={8}>
              <Stack>
                {/* 제목 */}
                <Typography variant={'xl'}>{data.pjtNm}</Typography>
                {/* 프로젝트 간단한 설명 */}
                <Typography variant={'sm'}>{data.pjtIntro}</Typography>
                <Divider></Divider>
                {/* 팀장, 기간 */}
                <Stack
                  direction={'row'}
                  spacing={1}
                  mt={1}
                  alignContent={'center'}
                >
                  <Typography variant="sm">팀장</Typography>
                  <Chip label={data.teamLeader} size="small"></Chip>
                </Stack>
                <Stack direction={'row'} spacing={1}>
                  <Typography variant="sm">프로젝트 시작일</Typography>
                  <Typography variant="sm">{data.startDt}</Typography>
                </Stack>
                <Stack direction={'row'} spacing={1}>
                  <Typography variant="sm">예상기간</Typography>
                  <Typography variant="sm">
                    {data.period}
                    {data.durationUnit}
                  </Typography>
                </Stack>
                <Divider></Divider>
              </Stack>
            </Grid>
            {data.pjtImg && (
              <Grid item xs={8} md alignContent={'center'} p={1}>
                <ResponsiveImg
                  src={data.pjtImg}
                  alt={'이미지'}
                  width={200}
                  height={150}
                />
              </Grid>
            )}
          </Grid>

          {/* 프로젝트 설명 */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography fontWeight={'fontWeightMedium'}>
                프로젝트 설명
              </Typography>
              <Divider sx={{ my: 1 }}></Divider>
              <Typography variant={'sm'}>{data.pjtDetail}</Typography>
            </Grid>
          </Grid>

          {/* 요구 기술 */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography fontWeight={'fontWeightMedium'}>요구 기술</Typography>
              <Divider sx={{ my: 1 }}></Divider>
              {data.stack && data.stack.length > 0 ?
                <Grid item container spacing={0.5}>
                  {data.stack.split(',').map((stack, index) => (
                    <Grid item key={`stack${index}`}>
                      <Chip label={stack.trim()} size="small" />
                    </Grid>
                  ))}
                </Grid>
              : <Chip label={data.stack || 'No Data'} size="small" />}
            </Grid>
          </Grid>

          {/* 모집 인원 */}
          <Grid item container spacing={0.5}>
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography fontWeight={'fontWeightMedium'}>모집 인원</Typography>
              <Typography variant={'sm'}>
                {`현재 인원: ${data?.TO}명 / 총 희망 인원: ${data?.PO}명`}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }}></Divider>
            </Grid>

            <Grid item container spacing={2}>
              {data.role.map((group, index) => (
                <Group
                  key={`group_${index}`}
                  title={group.part}
                  currentCnt={group.cnt}
                  expectCnt={group.totalCnt}
                  userInfo={userInfo}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MatchSelectedProject;
