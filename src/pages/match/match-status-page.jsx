import { Grid, Typography } from '@mui/material';

import { MatchList } from '@/pages/match/components';

// ----------------------------------------------------------------------

const MatchStatusPage = () => {
  return (
    <Grid container gap={3}>
      <Typography variant={'xl'}>매칭 현황</Typography>
      <MatchList />
    </Grid>
  );
};

export default MatchStatusPage;
