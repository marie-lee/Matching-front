import { Chip, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { ResponsiveImg } from '@/components/img';

// ----------------------------------------------------------------------

const PORTFOLIOS = [
  {
    id: 1,
    pfolNm: '포트폴리오1',
    intro: '포트폴리오1에 대한 설명',
    startDt: '2021-01-01',
    endDt: '2021-05-10',
    stacks: [
      {
        stNm: 'Java',
      },
      {
        stNm: 'Spring',
      },
    ],
    img: 'https://via.placeholder.com/230x150?text=Portfolio 1',
  },
  {
    id: 2,
    pfolNm: '포트폴리오2',
    intro: '포트폴리오2에 대한 설명',
    startDt: '2021-01-01',
    endDt: '2021-05-10',
    stacks: [
      {
        stNm: 'React',
      },
      {
        stNm: 'TypeScript',
      },
    ],
    img: 'https://via.placeholder.com/230x150?text=Porfolio 2',
  },
  {
    id: 3,
    pfolNm: '포트폴리오3',
    intro: '포트폴리오3에 대한 설명',
    startDt: '2021-01-01',
    endDt: '2021-05-10',
    stacks: [
      {
        stNm: 'React',
      },
      {
        stNm: 'TypeScript',
      },
    ],
    img: 'https://via.placeholder.com/230x150?text=Porfolio 3',
  },
  {
    id: 4,
    pfolNm: '포트폴리오4',
    intro: '포트폴리오4에 대한 설명',
    startDt: '2021-01-01',
    endDt: '2021-05-10',
    stacks: [
      {
        stNm: 'AWS',
      },
      {
        stNm: 'NodeJs',
      },
      {
        stNm: 'MySQL',
      },
    ],
    img: 'https://via.placeholder.com/230x150?text=Porfolio 4',
  },
  {
    id: 5,
    pfolNm: '포트폴리오5',
    intro: '포트폴리오5에 대한 설명',
    startDt: '2021-01-01',
    endDt: '2021-05-10',
    stacks: [
      {
        stNm: 'React',
      },
      {
        stNm: 'NextJS',
      },
      {
        stNm: 'TypeScript',
      },
      {
        stNm: 'MUI',
      },
      {
        stNm: 'MySQL',
      },
    ],
    img: 'https://via.placeholder.com/230x150?text=Porfolio 5',
  },
];

const PortfolioList = () => {
  // ----------------------------------------------------------------------

  return (
    <Stack p={3} rowGap={3} bgcolor={'background.default'}>
      <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
        <Typography variant={'xl'}>포트폴리오</Typography>
        <IconButton>
          <Icon icon={'akar-icons:edit'} fontSize={24} />
        </IconButton>
      </Stack>

      <Grid container columnSpacing={2} rowSpacing={3}>
        {PORTFOLIOS.map((pfol) => (
          <Grid item xs={12} md={4} key={pfol.id}>
            <Stack spacing={0.5} sx={{ cursor: 'pointer' }}>
              {/* 대표 이미지 */}
              <ResponsiveImg
                src={pfol.img}
                alt={`${pfol.pfolNm}_image`}
                width={230}
                height={150}
              />

              {/* 포트폴리오 제목 */}
              <Typography component={'p'} variant={'lg'}>
                {pfol.pfolNm}
              </Typography>

              {/* 프로젝트 기간 */}
              <Typography
                component={'p'}
                variant={'sm'}
                color={'text.secondary'}
              >
                {`${pfol.startDt} ~ ${pfol.endDt}`}
              </Typography>

              {/* 사용 스킬 */}
              <Stack
                useFlexGap
                flexWrap={'wrap'}
                direction={'row'}
                spacing={0.5}
              >
                {pfol.stacks.map((stack, index) => (
                  <Chip
                    key={`${pfol.pfolNm}_stack_${index}`}
                    label={stack.stNm}
                    size={'small'}
                  />
                ))}
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default PortfolioList;
