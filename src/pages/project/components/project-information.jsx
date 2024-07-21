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

const ProjectInformation = ({ onComplete }) => {
  const location = useLocation();
  const [projectDatas, setProjectDatas] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const fetchProject = async () => {
    try {
      const { projectData } = location.state;

      const res = await getProject(projectData.PJT_SN);
      console.log('내 프로젝트 조회', res.data);

      const userInfo = res.data.role.map((role) => ({
        names: role.mem.split(',').join(', '),
        part: role.part,
      }));
      setUserInfo(userInfo);
      setProjectDatas(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      onComplete();
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (!projectDatas) {
    return <div>Loading.....</div>;
  }

  return (
    <Grid
      item
      container
      p={3}
      bgcolor={'background.default'}
      border={1}
      borderColor={'divider'}
      borderRadius={1}
    >
      <Grid item container spacing={2}>
        {/* 제목, 프로젝트명, 기간, 팀장, 이미지  */}
        <Grid item container>
          <Grid item xs={12} md={10}>
            <Stack>
              {/* 제목 */}
              <Typography variant={'xl'}>{projectDatas.pjtNm}</Typography>
              {/* 팀장, 기간 */}
              <Stack direction={'row'} spacing={1} mt={1}>
                <Typography>{projectDatas.pjtIntro}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        {/* 구분선 */}
        <Grid item xs={12}>
          <Divider flexItem />
        </Grid>

        {/* 프로젝트 설명 */}
        <Grid item container spacing={0.5}>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography fontWeight={'fontWeightBold'}>
                프로젝트 정보
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={2}>
                <Typography>기간</Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant={'sm'}>
                  {projectDatas.startDt}~{projectDatas.endDt}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={2}>
                <Typography variant={'md'}>스택</Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant={'sm'}>
                  {projectDatas.stack && projectDatas.stack.length > 0 ?
                    <Grid item container spacing={0.5}>
                      {projectDatas.stack.split(',').map((stack, index) => (
                        <Grid item key={`stack${index}`}>
                          <Chip label={stack.trim()} size="small" />
                        </Grid>
                      ))}
                    </Grid>
                  : <Chip
                      label={projectDatas.stack || 'No Data'}
                      size="small"
                    />
                  }
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={1}>
              <Grid item xs={2}>
                <Typography variant={'md'}>모집 인원</Typography>
              </Grid>
              <Grid item container xs={10}>
                {projectDatas.role.map((group, index) => (
                  <Grid item key={`group_${index}`} xs={3}>
                    <Typography variant={'sm'}>
                      {group.part} : {group.totalCnt}명
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={1}>
              <Grid item xs={2}>
                <Typography variant={'md'}>남은 인원</Typography>
              </Grid>
              <Grid item container xs={10}>
                {projectDatas.role.map((group, index) => (
                  <Grid item key={`group_${index}`} xs={3}>
                    <Typography variant={'sm'}>
                      {group.part} : {group.totalCnt - group.cnt}명
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectInformation;
