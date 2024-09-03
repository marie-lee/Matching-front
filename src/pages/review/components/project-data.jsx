import { ResponsiveImg } from '@/components/img';
import WbsIssue from '@/pages/wbs/components/wbs-issue';
import {
  Button,
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
  useTheme,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectData = ({ reviewMembers, projectInfo }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { pjtSn } = useParams();

  const handleClick = (member) => {
    navigate(`/review/input/${member.userSn}`, { state: { ...member, pjtSn } });
  };

  const portfolioData = {
    PFOL_NM: 'Pick',
    START_DT: '2022-04-01T00:00:00.000Z',
    END_DT: '2023-05-08T00:00:00.000Z',
    CONTRIBUTION: 100,
    RESULT: '만족',
    stack: [
      {
        ST_NM: 'React',
      },
      {
        ST_NM: 'ReduxToolKit',
      },
      {
        ST_NM: 'TypeScript',
      },
    ],
    roles: [
      {
        ROLE_NM: '프론트엔드',
      },
    ],
    urls: [
      {
        URL: 'https://www.naver.com/',
        URL_INTRO: '웹 사이트 링크',
        RELEASE_YN: 0,
        OS: 'Windows',
      },
    ],
    media: [
      {
        URL: 'data:image/jpeg;base64,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',
        MAIN_YN: 1,
      },
    ],
    members: [
      {
        USER_ID: 'admin',
        USER_NM: '홍길동',
        CONTRIBUTION: 100,
        ROLE: '프론트엔드',
        ISREVIEWD: 1,
      },
      {
        USER_ID: 'admin',
        USER_NM: '한혜원',
        CONTRIBUTION: 100,
        ROLE: '백엔드',
        ISREVIEWD: 0,
      },
    ],
  };

  return !projectInfo.length ?
      <div>loading</div>
    : <Grid item xs={12}>
        <Stack spacing={2}>
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
            {projectInfo[0].pjtNm}
          </Typography>
          <Stack
            spacing={2}
            p={3}
            bgcolor={'background.default'}
            borderRadius={1}
          >
            <Grid container>
              <Grid item xs={12} md={4} sx={{ px: 1 }}>
                <ResponsiveImg
                  src={projectInfo[0].pjtImg}
                  alt={projectInfo[0].pjtNm}
                  width={360}
                  height={200}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                md={8}
                sx={{ px: 1 }}
                alignItems={'center'}
              >
                <Grid item container xs={6} direction="column" spacing={1}>
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    {/* 기간 */}
                    <Grid item xs={3}>
                      <Typography variant="md">기간</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        variant="sm"
                        color={theme.palette.text.secondary}
                      >{`${projectInfo[0].startDt} ~ ${projectInfo[0].endDt}`}</Typography>
                    </Grid>
                    {/* 인원 */}
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Grid item xs={3}>
                        <Typography variant="md">인원</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="sm">
                          {projectInfo[0].totalMembers}명
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* 역할 */}
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Grid item xs={3}>
                        <Typography variant="md">역할</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Chip label={projectInfo[0].role} size={'small'} />
                      </Grid>
                    </Grid>
                    {/* 서비스 상태 */}
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Grid item xs={3}>
                        <Typography variant="md">서비스 상태</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="sm">운영 중</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={6} direction="column" spacing={1}>
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    {/* 링크 */}
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Grid item xs={3}>
                        <Typography variant="md">링크</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        {portfolioData.urls.map((url, index) => (
                          <a
                            key={`${portfolioData.PFOL_NM}_url_${index}`}
                            href={url.URL}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {url.URL}
                          </a>
                        ))}
                      </Grid>
                    </Grid>
                    {/* 내 기여도 */}
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Grid item xs={3}>
                        <Typography variant="md">내 기여도</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant={'sm'}>
                          {projectInfo[0].contribution}%
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* 스택 */}
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Grid item xs={3}>
                        <Typography variant="md">스택</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        {projectInfo[0].stack.split(',').map((stack, index) => (
                          <Chip
                            key={`${projectInfo[0].pjtNm}_stack_${index}`}
                            label={stack}
                            size={'small'}
                            sx={{ mr: 1 }}
                          />
                        ))}
                      </Grid>
                    </Grid>
                    {/* 성과 */}
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Grid item xs={3}>
                        <Typography variant="md">성과</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="sm">
                          {portfolioData.RESULT}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
          <Stack
            spacing={2}
            p={3}
            bgcolor={'background.default'}
            borderRadius={1}
          >
            <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
              <Table sx={{ textAlign: 'center' }}>
                <TableHead
                  sx={{ backgroundColor: 'rgba(184, 184, 184, 0.33)' }}
                >
                  <TableRow>
                    <TableCell align="center">역할</TableCell>
                    <TableCell align="center">이름</TableCell>
                    <TableCell align="center">기여도</TableCell>
                    <TableCell align="center">상호평가</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reviewMembers.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{member.part}</TableCell>
                      <TableCell align="center">{member.userNm}</TableCell>
                      <TableCell align="center">
                        {member.contribution}%
                      </TableCell>
                      <TableCell align="center">
                        {/* 팀원 평가 버튼 */}
                        {member.isRated ?
                          <Button disabled>평가 완료</Button>
                        : <Button onClick={() => handleClick(member)}>
                            평가 하기
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
          <WbsIssue />
        </Stack>
      </Grid>;
};

export default ProjectData;
