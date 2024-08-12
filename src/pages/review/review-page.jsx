import { Container, Grid } from '@mui/material';

import {
  ProjectData,
  MemberFeedback,
  MemberReview,
} from '@/pages/review/components';

// ----------------------------------------------------------------------

const PeerReviewPage = () => {
  // ----------------------------------------------------------------------

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={1.5} px={20} pt={3}>
        <ProjectData />
        <MemberFeedback />
        <MemberReview />
      </Grid>
    </Container>
  );
};

export default PeerReviewPage;
