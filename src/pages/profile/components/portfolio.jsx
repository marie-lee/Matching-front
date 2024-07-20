import { Button, Chip, Grid, Stack, Typography } from '@mui/material';
import { ResponsiveImg } from '@/components/img';
import { PATHS } from '@/routes/paths';

const PortfolioListPreview = ({ profileEditForm }) => {
  const profile = profileEditForm.getValues();
  const portfolio = profile.PORTFOLIO;

  const renderList = () => {
    return (
      <Grid container columnSpacing={2} rowSpacing={3}>
        {portfolio.map((pfol) => (
          <Grid item xs={12} md={4} key={pfol.id}>
            <Stack spacing={0.5} sx={{ cursor: 'pointer' }}>
              {/* 대표 이미지 */}
              <ResponsiveImg
                src={pfol.IMAGE_URL[0].URL}
                alt={`${pfol.pfolNm}`}
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
              <Stack useFlexGap flexWrap={'wrap'} direction={'row'} gap={0.7}>
                {pfol.TECH_STACK.map((stack, index) => (
                  <Chip
                    key={`${pfol.pfolNm}_stack_${index}`}
                    label={stack}
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

  return (
    <Stack p={3} rowGap={3} bgcolor={'background.default'}>
      <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
        <Typography variant={'xl'}>포트폴리오</Typography>
      </Stack>

      {/* 포트폴리오가 있는 경우 */}
      {portfolio && renderList(portfolio)}

      {/* 포트폴리오가 없고, 프로필은 있는 경우 */}
      {!portfolio.length && (
        <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
          <Typography textAlign={'center'}>
            아직 등록한 포트폴리오가 없어요! 🥲
          </Typography>
          <Button onClick={() => navigate(PATHS.profiles.editPortfolio)}>
            포트폴리오 추가하러 가기
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
export default PortfolioListPreview;
