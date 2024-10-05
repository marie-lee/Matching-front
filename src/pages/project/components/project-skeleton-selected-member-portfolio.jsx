import { Grid, Stack, Skeleton, Typography, Box } from '@mui/material';

const SeletedMemberItemSkeleton = () => {
  return (
    <Grid container columnSpacing={2} rowSpacing={3} pt={1}>
      {Array.from(new Array(3)).map((_, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Stack
            spacing={0.5}
            sx={{ cursor: 'pointer' }}
            bgcolor={'background.default'}
            border={1}
            borderColor={'divider'}
            borderRadius={1}
            minHeight={370}
          >
            {/* 대표 이미지 스켈레톤 */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={120}
              style={{ borderRadius: '8px' }}
            />
            <Stack p={2}>
              {/* 포트폴리오 제목 스켈레톤 */}
              <Typography component={'p'} variant={'lg'}>
                <Skeleton width="60%" />
              </Typography>

              {/* 포트폴리오 설명 스켈레톤 */}
              <Typography
                component={'p'}
                variant={'sm'}
                color={'text.secondary'}
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '1.5',
                  minHeight: '4.5em',
                }}
              >
                <Skeleton width="100%" />
                <Skeleton width="100%" />
                <Skeleton width="80%" />
              </Typography>

              {/* 프로젝트 기간 스켈레톤 */}
              <Typography
                component={'p'}
                variant={'sm'}
                color={'text.secondary'}
              >
                <Skeleton width="40%" />
              </Typography>

              {/* 사용 스킬 스켈레톤 */}
              <Stack useFlexGap flexWrap={'wrap'} direction={'row'} gap={0.7}>
                {Array.from(new Array(3)).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={60}
                    height={24}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      ))}
      <Box>{/* 포트폴리오가 없을때 */}</Box>
    </Grid>
  );
};

export default SeletedMemberItemSkeleton;
