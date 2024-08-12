import {
  Avatar,
  Chip,
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

const ReviewInputTable = ({ review, setReview }) => {
  const reviewMember = {
    name: '김민수',
    position: 'Front',
  };
  const questions = [
    '해당 팀원이 프로젝트에서 맡은 기술적 역할을 잘 수행했습니다',
    '팀원과의 커뮤니케이션이 원활했습니다',
    '할당된 작업을 기한 내에 완수했습니다',
    '예기치 않은 문제를 잘 해결했습니다',
    '해당 팀원과 다시 함께 일하고 싶은 의사가 있습니다.',
  ];

  return (
    <Grid item xs={12}>
      <Stack spacing={2}>
        <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
          상호평가 대상자 :{' '}
          <Chip
            size="small"
            color="default"
            variant="Filled"
            label={reviewMember.name + '/' + reviewMember.position}
            avatar={<Avatar alt={`${name} 프로필 이미지`} />}
          ></Chip>
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
                  <TableCell
                    align="center"
                    rowSpan={2}
                    colSpan={1}
                    sx={{ width: '50%' }}
                  >
                    상호평가 조사문항
                  </TableCell>
                  <TableCell align="center" colSpan={5}>
                    상호평가
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={1}
                    style={{ width: '10%' }}
                  >
                    매우 그렇다
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={1}
                    style={{ width: '10%' }}
                  >
                    그렇다
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={1}
                    style={{ width: '10%' }}
                  >
                    보통이다
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={1}
                    style={{ width: '10%' }}
                  >
                    그렇지 않다
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={1}
                    style={{ width: '10%' }}
                  >
                    전혀 그렇지 않다
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((question, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{question}</TableCell>
                    {Array.from({ length: 5 }, (_, i) => (
                      <TableCell key={i} align="center">
                        <input
                          type="radio"
                          name={`review-${index}`}
                          value={i + 1}
                          onChange={(e) => {
                            const newReview = [...review];
                            newReview[index] = e.target.value;
                            setReview(newReview);
                          }}
                        />
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

export default ReviewInputTable;
