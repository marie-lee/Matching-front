import { Grid, Typography } from '@mui/material';

const projectInfos = {
  작성자: '이종은',
  작성일: '2024-06-09',
  시작일: '2024-06-30',
  종료일: '2024-12-11',
};

const ProjectInfo = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{ width: '20%', margin: 'auto' }}
    >
      <Grid item>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          프로젝트 정보
        </Typography>
      </Grid>
      {Object.keys(projectInfos).map((key) => (
        <Grid
          ml={3}
          item
          container
          key={key}
          sx={{ borderBottom: '1px solid #f4f6f8' }}
        >
          <Grid item xs={4}>
            <Typography variant="body1" sx={{ color: 'grey.600' }}>
              {key}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ color: 'grey.600' }}>
              {projectInfos[key]}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectInfo;
