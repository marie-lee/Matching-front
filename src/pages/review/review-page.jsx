import { Container, Grid } from '@mui/material';

import { ProjectData, MemberFeedback } from '@/pages/review/components';

// ----------------------------------------------------------------------

const PeerReviewPage = () => {
  // ----------------------------------------------------------------------

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={1.5} px={20} pt={3}>
        <ProjectData />
        <MemberFeedback />

        <Grid item xs={12}>
          ddd
        </Grid>
      </Grid>
    </Container>
  );
};

export default PeerReviewPage;
