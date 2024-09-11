import {
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useState, useEffect, Fragment } from 'react';
import { getProject } from '@/services/project';
import { ResponsiveImg } from '@/components/img';
import { useLocation } from 'react-router-dom';
import { getProfile } from '@/services/member';
import { UserInfo } from '.';
import MatchSelectedMember, { GetPortfolioList } from './match-selected-member';

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
const TeamLeaderDialog = ({ open, setOpen, member }) => {
  // 팀장 정보 다이얼로그
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>팀장 정보</DialogTitle>
      <DialogContent>
        <Stack>
          <Grid
            p={2}
            border={1}
            borderColor={'divider'}
            borderRadius={1}
            container
            bgcolor={'background.default'}
          >
            <Grid item container xs={12} md={'auto'}>
              <Avatar alt={'프로필 이미지'} sx={{ width: 130, height: 130 }} />
            </Grid>
            <Grid item container xs pl={2}>
              {/* 이름 및 요청 버튼 */}
              <Grid
                item
                container
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Typography variant={'lg'}>
                  {member?.profile?.USER_NM}
                </Typography>
              </Grid>

              {/* 한 줄 소개 */}
              <Grid item container mt={1}>
                <Typography variant={'md'}>
                  {member?.profile?.PF_INTRO}
                </Typography>
                <Grid item container spacing={0.5} alignItems={'center'} mt={2}>
                  {member?.profile.url?.map((url, index) => (
                    <Fragment key={`url_${index}`}>
                      <Grid item xs={12} sm={2}>
                        <Typography fontWeight={'fontWeightMedium'}>
                          {url?.URL_INTRO}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={10}>
                        <Typography size={'sm'} color={'text.secondary'}>
                          {url?.URL_ADDR}
                        </Typography>
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            {/* 주요 스킬 */}
            <Grid item xs={12} mt={4}>
              <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
                주요 스킬
              </Typography>
              <Divider />
              <Grid container spacing={1} pt={1}>
                {member?.profile?.stack?.map((skill, index) => (
                  <Grid item key={`stack_${index}`}>
                    <Chip key={`chip_${index}`} label={skill?.ST_NM} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {/* 경력 */}
            <Grid item xs={12} mt={4}>
              <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
                경력
              </Typography>
              <Divider></Divider>
              <Stack spacing={1} pt={1}>
                {member?.profile?.carrer?.map((exp, index) => (
                  <Fragment key={`career_${index}`}>
                    {/* Fragment에 key prop 추가 */}
                    <Stack
                      key={`career_${index}`}
                      direction={'row'}
                      spacing={2}
                      alignItems={'center'}
                    >
                      <Typography>{exp?.CARRER_NM}</Typography>
                      <Typography variant={'sm'} color={'text.secondary'}>
                        {exp?.ENTERING_DT} ~ {exp?.QUIT_DT}
                      </Typography>
                    </Stack>
                    <Divider></Divider>
                  </Fragment>
                ))}
              </Stack>
            </Grid>
          </Grid>
          {/* 포트폴리오 */}
          <Grid item xs={12} mt={2}>
            <GetPortfolioList portfolio={member?.portfolioInfo} />
          </Grid>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

const MatchSelectedProject = ({ data }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [leader, setLeader] = useState(null);

  if (!data) {
    return null;
  }

  const fetchUserDetail = async (createdUserSn) => {
    try {
      const res = await getProfile(createdUserSn);
      // 다이얼로그 열기
      setOpen(true);
      setLeader(res);
    } catch (error) {
      console.dir(error);
    }
  };

  const handleClickLeader = () => {
    fetchUserDetail(data?.createdUserSn);
  };

  return (
    <Stack>
      {leader && (
        <TeamLeaderDialog open={open} setOpen={setOpen} member={leader?.data} />
      )}
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
                  <Chip
                    label={data.teamLeader}
                    size="small"
                    // onClick={handleClickLeader}
                  />
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
