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
  const questions = [
    '해당 팀원이 프로젝트에서 맡은 기술적 역할을 잘 수행했습니다',
    '팀원과의 커뮤니케이션이 원활했습니다',
    '할당된 작업을 기한 내에 완수했습니다',
    '예기치 않은 문제를 잘 해결했습니다',
    '해당 팀원과 다시 함께 일하고 싶은 의사가 있습니다.',
  ];
  const data = {
    reviews: [
      {
        ANSWER: [1, 2, 3, 4, 5],
      },
      {
        ANSWER: [5, 4, 3, 2, 1],
      },
      {
        ANSWER: [1, 2, 3, 4, 5],
      },
      {
        ANSWER: [5, 4, 3, 2, 1],
      },
      {
        ANSWER: [1, 2, 3, 4, 5],
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
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 0, overflow: 'auto' }}
          >
            <Table sx={{ textAlign: 'center' }}>
              <TableHead sx={{ backgroundColor: '#B2E8F0' }}>
                <TableRow>
                  <TableCell align="center" rowSpan={2} sx={{ width: '50%' }}>
                    평가항목
                  </TableCell>
                  <TableCell align="center" colSpan={data.reviews.length}>
                    팀원
                  </TableCell>
                </TableRow>
                <TableRow>
                  {data.reviews.map((review, index) => (
                    <TableCell key={index} align="center">
                      {String.fromCharCode(65 + index)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.reviews.map((review, index) => (
                  <TableRow key={index}>
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">{questions[index]}</TableCell>
                    </TableRow>
                    {review.ANSWER.map((answer, index) => (
                      // 응답을 숫자로 표현하는 것 대신에 1은 매우 그렇지 않다 2는 그렇지 않다 3은 보통이다 4는 그렇다 5는 매우 그렇다로 변경
                      <TableCell key={index} align="center">
                        {answer === 1 ?
                          '매우 그렇지 않다'
                        : answer === 2 ?
                          '그렇지 않다'
                        : answer === 3 ?
                          '보통이다'
                        : answer === 4 ?
                          '그렇다'
                        : '매우 그렇다'}
                      </TableCell>
                    ))}
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
