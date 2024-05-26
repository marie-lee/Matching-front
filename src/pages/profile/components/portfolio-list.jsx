import {
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { ResponsiveImg } from '@/components/img';

// ----------------------------------------------------------------------

const PortfolioList = ({ hasProfile, hasPortfolio, data }) => {
  const renderList = () => {
    return (
      <Grid container columnSpacing={2} rowSpacing={3}>
        {data.map((pfol) => (
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
    );
  };

  // ----------------------------------------------------------------------

  return (
    <Stack p={3} rowGap={3} bgcolor={'background.default'}>
      <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
        <Typography variant={'xl'}>포트폴리오</Typography>
        <IconButton>
          <Icon icon={'akar-icons:edit'} fontSize={24} />
        </IconButton>
      </Stack>

      {/* 포트폴리오가 있는 경우 */}
      {hasPortfolio && renderList()}

      {/* 포트폴리오가 없고, 프로필은 있는 경우 */}
      {!hasPortfolio && hasProfile && (
        <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
          <Typography textAlign={'center'}>
            아직 등록한 포트폴리오가 없어요! 🥲
          </Typography>
          <Button>포트폴리오 추가하러 가기</Button>
        </Stack>
      )}
    </Stack>
  );
};

export default PortfolioList;
