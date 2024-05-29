import { Grid, Typography } from '@mui/material';

const ProjectDetailsMatchStatus = () => {
  return (
    <Grid container p={3} bgcolor={'background.default'}>
      {/* 제목 */}
      <Grid item xs={12}>
        <Typography variant={'xl'}>매칭 현황</Typography>
      </Grid>
    </Grid>
  );
};

export default ProjectDetailsMatchStatus;
