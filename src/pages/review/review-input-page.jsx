import { Container, Grid } from '@mui/material';
import { ReviewInputTable, ReviewInputText } from '@/pages/review/components';

const ReviewInputPage = () => {
  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={1.5} px={20} pt={3}>
        <ReviewInputTable />
        <ReviewInputText />
      </Grid>
    </Container>
  );
};

export default ReviewInputPage;
