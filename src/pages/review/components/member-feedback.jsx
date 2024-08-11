import {
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const MemberFeedback = ({ feedback }) => {
  const data = {
    reviews: [
      {
        ROLE: '팀장',
        USER_NM: '홍길동',
        CONTRIBUTION: 100,
        ISREVIEWD: true,
      },
      {
        ROLE: '팀원',
        USER_NM: '김철수',
        CONTRIBUTION: 80,
        ISREVIEWD: true,
      },
      {
        ROLE: '팀원',
        USER_NM: '김영희',
        CONTRIBUTION: 70,
        ISREVIEWD: false,
      },
      {
        ROLE: '팀원',
        USER_NM: '김영수',
        CONTRIBUTION: 60,
        ISREVIEWD: false,
      },
    ],
  };
  return (
    <Grid item xs={12}>
      <Stack spacing={1}>
        <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
          팀원 평가
        </Typography>
        <Stack
          spacing={2}
          p={3}
          bgcolor={'background.default'}
          borderRadius={1}
        >
          <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
            <Table sx={{ textAlign: 'center' }}>
              <TableHead sx={{ backgroundColor: 'rgba(184, 184, 184, 0.33)' }}>
                <TableRow>
                  <TableCell align="center">역할</TableCell>
                  <TableCell align="center">이름</TableCell>
                  <TableCell align="center">기여도</TableCell>
                  <TableCell align="center">상호평가</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.reviews.map((review, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{review.ROLE}</TableCell>
                    <TableCell align="center">{review.USER_NM}</TableCell>
                    <TableCell align="center">{review.CONTRIBUTION}</TableCell>
                    <TableCell align="center">
                      {review.ISREVIEWD ? 'O' : 'X'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default MemberFeedback;
