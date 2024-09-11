import { Button, Chip, Grid, Stack, Typography } from '@mui/material';
import { ResponsiveImg } from '@/components/img';
import { PATHS } from '@/routes/paths';

const PortfolioListPreview = ({ profileEditForm }) => {
  const PreviewData = profileEditForm.getValues();
  const portfolio = PreviewData.portfolioInfo;

  const renderList = () => {
    return (
      <Grid container columnSpacing={2} rowSpacing={3}>
        {portfolio.map((pfol) => {
          const mainImage = pfol?.IMG?.find((img) => img.MAIN_YN === true);

          // mainImage가 파일 객체인지 URL 문자열인지 확인
          const imageUrl =
            mainImage?.file instanceof File ?
              URL.createObjectURL(mainImage.file)
            : mainImage?.URL;
          return (
            <Grid item xs={12} md={4} key={pfol.PFOL_NM}>
              <Stack spacing={0.5} sx={{ cursor: 'pointer' }}>
                {/* 대표 이미지 */}
                <ResponsiveImg
                  src={imageUrl}
                  alt={`${pfol.PFOL_NM}`}
                  width={230}
                  height={150}
                />

                {/* 포트폴리오 제목 */}
                <Typography component={'p'} variant={'lg'}>
                  {pfol.PFOL_NM}
                </Typography>

                {/* 프로젝트 기간 */}
                <Typography
                  component={'p'}
                  variant={'sm'}
                  color={'text.secondary'}
                >
                  {`${pfol.START_DT} ~ ${pfol.END_DT}`}
                </Typography>

                {/* 사용 스킬 */}
                <Stack useFlexGap flexWrap={'wrap'} direction={'row'} gap={0.7}>
                  {pfol.stack.map((stack, index) => (
                    <Chip
                      key={`${pfol.PFOL_NM}_stack_${index}`}
                      label={stack.ST_NM}
                      size={'small'}
                    />
                  ))}
                </Stack>
              </Stack>
            </Grid>
          );
        })}
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
