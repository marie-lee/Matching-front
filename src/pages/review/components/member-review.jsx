import { Grid, Stack, Typography } from '@mui/material';

const MemberReview = ({ review }) => {
  const reviews = [
    {
      RATE_1: 5,
      RATE_2: 4,
      RATE_3: 3,
      RATE_4: 2,
      RATE_5: 1,
      RATE_TEXT:
        '열정적으로 프로젝트에 참가하여 다양한 문제를 잘 해결하는 모습이 보기 좋았습니다.',
    },
    {
      RATE_1: 3,
      RATE_2: 4,
      RATE_3: 5,
      RATE_4: 2,
      RATE_5: 1,
      RATE_TEXT:
        '프로젝트에서 맡은 역할을 잘 수행하였으나, 커뮤니케이션 부분에서 조금 더 신경 써주었으면 좋겠습니다.',
    },
  ];
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
        : reviews.map((review, index) => (
            <Stack
              key={index}
              spacing={2}
              p={3}
              bgcolor={'background.default'}
              borderRadius={1}
              border={1}
              borderColor={'divider'}
            >
              <Typography variant={'body1'}>{review.RATE_TEXT}</Typography>
            </Stack>
          ))
        }
      </Stack>
    </Grid>
  );
};

export default MemberReview;
