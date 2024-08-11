import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

// ----------------------------------------------------------------------

const ProjectInformation = ({ projectData }) => {
  if (!projectData) {
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
              <Typography variant={'xl'}>{projectData.pjtNm}</Typography>
              {/* 팀장, 기간 */}
              <Stack direction={'row'} spacing={1} mt={1}>
                <Typography>{projectData.pjtIntro}</Typography>
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
                  {projectData.startDt}~{projectData.endDt}
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
                  {projectData.stack && projectData.stack.length > 0 ?
                    <Grid item container spacing={0.5}>
                      {projectData.stack.split(',').map((stack, index) => (
                        <Grid item key={`stack${index}`}>
                          <Chip label={stack.trim()} size="small" />
                        </Grid>
                      ))}
                    </Grid>
                  : <Chip label={projectData.stack || 'No Data'} size="small" />
                  }
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={1}>
              <Grid item xs={2}>
                <Typography variant={'md'}>모집 인원</Typography>
              </Grid>
              <Grid item container xs={10}>
                {projectData?.role?.map((group, index) => (
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
                {projectData?.role?.map((group, index) => (
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
