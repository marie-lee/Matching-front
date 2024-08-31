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
  const ratingToText = (rating) => {
    switch (rating) {
      case 1:
        return '매우 그렇지 않다';
      case 2:
        return '그렇지 않다';
      case 3:
        return '보통이다';
      case 4:
        return '그렇다';
      case 5:
        return '매우 그렇다';
      default:
        return '';
    }
  };

  return (
    <Grid item xs={12}>
      <Stack spacing={1}>
        <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
          팀원 평가
        </Typography>
        {feedback.length === 0 ?
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
              아직 팀원평가가 없습니다.
            </Typography>
          </Stack>
        : <Stack
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
                    <TableCell align="center" colSpan={feedback.length}>
                      팀원
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {feedback.map((review, index) => (
                      <TableCell key={index} align="center">
                        {String.fromCharCode(65 + index)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((question, questionIndex) => (
                    <TableRow key={questionIndex}>
                      <TableCell align="left">{question}</TableCell>
                      {feedback.map((review, feedbackIndex) => (
                        <TableCell key={feedbackIndex} align="center">
                          {ratingToText(review[`RATE_${questionIndex + 1}`])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        }
      </Stack>
    </Grid>
  );
};

export default MemberFeedback;
