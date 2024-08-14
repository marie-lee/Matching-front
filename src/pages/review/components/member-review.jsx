import { Grid, Stack, Typography } from '@mui/material';

const MemberReview = ({ review }) => {
  const reviews = [
    {
      ANSWER: '프로젝트에서 아쉬운 부분이 많았습니다',
    },
    {
      ANSWER:
        '열정적으로 프로젝트에 임하며 이슈발생시, 적극적으로 해결해나가는 모습이 인상깊었습니다.',
    },
  ];
  return (
    <Grid item xs={12}>
      <Stack spacing={1}>
        <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
          팀원 리뷰
        </Typography>
        {reviews.map((review, index) => (
          <Stack
            key={index}
            spacing={2}
            p={3}
            bgcolor={'background.default'}
            borderRadius={1}
            border={1}
            borderColor={'divider'}
          >
            <Typography variant={'body1'}>{review.ANSWER}</Typography>
          </Stack>
        ))}
      </Stack>
    </Grid>
  );
};

export default MemberReview;
