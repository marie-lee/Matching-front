import { Grid, Stack, Typography } from '@mui/material';

const MemberReview = ({ review }) => {
  console.log('review', review);
  return (
    <Grid item xs={12}>
      <Stack spacing={1}>
        <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
          팀원 리뷰
        </Typography>
        {review.length === 0 ?
          <Stack
            spacing={2}
            p={3}
            bgcolor={'background.default'}
            borderRadius={1}
          >
            <Typography
              variant={'md'}
              fontWeight={'fontWeight'}
              color={'text.secondary'}
            >
              아직 팀원리뷰가 없습니다.
            </Typography>
          </Stack>
        : review.map((item, index) => (
            <Stack
              key={index}
              spacing={2}
              p={3}
              bgcolor={'background.default'}
              borderRadius={1}
              border={1}
              borderColor={'divider'}
            >
              <Typography variant={'body1'}>{item.RATE_TEXT}</Typography>
            </Stack>
          ))
        }
      </Stack>
    </Grid>
  );
};

export default MemberReview;
