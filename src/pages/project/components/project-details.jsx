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
import { getProject, getSTATUS } from '@/services/project';
import { ResponsiveImg } from '@/components/img';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectName } from '@/store/name-reducer';

const Group = ({ title, currentCnt, expectCnt, userInfo }) => {
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
        {userInfo.map((user, index) => {
          if (user.part === title) {
            return (
              <Chip
                key={index}
                avatar={<Avatar alt={`${user.name} 프로필 이미지`} />}
                label={user.name}
                size={'small'}
                clickable
              />
            );
          } else {
            return null;
          }
        })}
      </Box>
    </Grid>
  );
};

// ----------------------------------------------------------------------

const ProjectDetails = () => {
  const location = useLocation();
  const [projectData, setProjectData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const name = useSelector(selectName);
  console.log('name', name);

  const fetchProject = async () => {
    try {
      const { projectData } = location.state;

      const res = await getProject(projectData.PJT_SN);
      const res1 = await getSTATUS();
      const targetItem = res1.data.projectReqList.find(
        (item) => item.PJT_SN === projectData.PJT_SN,
      );
      console.log('targetItem', targetItem);

      const userInfo = targetItem.REQ_LIST.map((item) => ({
        name: item.USER_NM,
        part: item.PART,
      }));
      setUserInfo(userInfo);

      setProjectData(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <Grid item container p={3} bgcolor={'background.default'}>
      <Grid item container spacing={2}>
        {/* 제목, 프로젝트명, 기간, 팀장, 이미지  */}
        <Grid item container>
          <Grid item xs={12} md={10}>
            <Stack>
              {/* 제목 */}
              <Typography variant={'xl'}>{projectData.pjtNm}</Typography>
              {/* 팀장, 기간 */}
              <Stack direction={'row'} spacing={1} mt={1}>
                <Typography>팀장</Typography>
                <Typography>{name}</Typography>
              </Stack>
              <Stack direction={'row'} spacing={1}>
                <Typography>기간</Typography>
                <Typography>
                  {projectData.startDt}~{projectData.endDt}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          {projectData.pjtImg && (
            <Grid item xs={12} md>
              <ResponsiveImg
                src={projectData.img}
                alt={'이미지'}
                width={200}
                height={100}
              />
            </Grid>
          )}
        </Grid>

        {/* 구분선 */}
        <Grid item xs={12}>
          <Divider flexItem />
        </Grid>

        {/* 프로젝트 설명 */}
        <Grid item container spacing={0.5}>
          <Grid item xs={12}>
            <Typography fontWeight={'fontWeightMedium'}>
              프로젝트 설명
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={'sm'}>{projectData.pjtDetail}</Typography>
          </Grid>
        </Grid>

        {/* 구분선 */}
        <Grid item xs={12}>
          <Divider flexItem />
        </Grid>

        {/* 요구 기술 */}
        <Grid item container spacing={0.5}>
          <Grid item>
            <Typography fontWeight={'fontWeightMedium'}>요구 기술</Typography>
          </Grid>
          <Grid item container spacing={0.5}>
            {Array.isArray(projectData.stack) ?
              <Grid item container spacing={0.5}>
                {projectData.stack.map((stack, index) => (
                  <Grid item key={`stack${index}`}>
                    <Chip label={stack} size={'small'} />
                  </Grid>
                ))}
              </Grid>
            : <Chip label={projectData.stack} size={'small'} />}
          </Grid>
        </Grid>

        {/* 구분선 */}
        <Grid item xs={12}>
          <Divider flexItem />
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
              {`현재 인원: ${projectData?.TO}명 / 총 희망 인원: ${projectData?.PO}명`}
            </Typography>
          </Grid>

          <Grid item container spacing={2}>
            {projectData.role.map((group, index) => (
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
  );
};

export default ProjectDetails;
