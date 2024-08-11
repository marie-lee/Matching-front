import { Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { ResponsiveImg } from '@/components/img';

const Group = ({ title, currentCnt, expectCnt }) => {
  return (
    <Grid item xs={6}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        spacing={0.5}
        mb={0.5}
        p={2}
        sx={{
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
      >
        <Typography variant={'sm'}>{title}</Typography>
        <Typography variant={'sm'}>
          {currentCnt} / {expectCnt}
        </Typography>
      </Stack>
      {/*<Box*/}
      {/*  p={2}*/}
      {/*  sx={{*/}
      {/*    backgroundColor: (theme) => theme.palette.grey[300],*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Chip*/}
      {/*    avatar={<Avatar alt={'홍길동 프로필 이미지'} />}*/}
      {/*    label={'홍길동'}*/}
      {/*    size={'small'}*/}
      {/*    clickable*/}
      {/*  />*/}
      {/*</Box>*/}
    </Grid>
  );
};

const ProjectInfo = ({ data }) => {
  const stackArr = data?.stack?.split(',');

  return (
    <Grid item container p={3} bgcolor={'background.default'}>
      <Grid item container spacing={3}>
        {/* 제목, 프로젝트명, 기간, 팀장, 이미지  */}
        <Grid item container>
          <Grid item xs={12} md={7}>
            <Stack>
              {/* 제목 */}
              <Typography variant={'xl'}>{data.pjtNm}</Typography>
              {/* 팀장, 기간 */}
              {/*<Stack direction={'row'} spacing={1} mt={1}>*/}
              {/*  <Typography>팀장</Typography>*/}
              {/*  <Typography>{projectData.leaderNm}</Typography>*/}
              {/*</Stack>*/}
              <Stack direction={'row'} spacing={1}>
                <Typography>기간</Typography>
                <Typography>
                  {data.startDt} ~ {data.endDt}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          {data.pjtImg && (
            <Grid item xs={12} md>
              <ResponsiveImg
                src={data.pjtImg}
                alt={'이미지'}
                width={200}
                height={100}
              />
            </Grid>
          )}
        </Grid>

        {/* 구분선 */}
        <Grid item xs={12}>
          <Divider flexItem />
        </Grid>

        {/* 프로젝트 설명 */}
        <Grid item container spacing={0.5}>
          <Grid item xs={12}>
            <Typography fontWeight={'fontWeightMedium'}>
              프로젝트 설명
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={'sm'}>{data.pjtDetail}</Typography>
          </Grid>
        </Grid>

        {/* 구분선 */}
        <Grid item xs={12}>
          <Divider flexItem />
        </Grid>

        {/* 요구 기술 */}
        <Grid item container spacing={0.5}>
          <Grid item>
            <Typography fontWeight={'fontWeightMedium'}>요구 기술</Typography>
          </Grid>
          <Grid item container spacing={0.5}>
            {stackArr?.map((stack, index) => (
              <Grid item key={`stack_${index}`}>
                <Chip label={stack} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* 구분선 */}
        <Grid item xs={12}>
          <Divider flexItem />
        </Grid>

        {/* 모집 인원 */}
        <Grid item container spacing={0.5}>
          <Grid
            item
            container
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography fontWeight={'fontWeightMedium'}>모집 인원</Typography>
            <Typography variant={'sm'}>
              {`현재 인원: ${data?.TO}명 / 총 희망 인원: ${data?.PO}명`}
            </Typography>
          </Grid>

          <Grid item container spacing={2}>
            {data?.role.map((item) => (
              <Group
                key={item.part}
                title={item.part}
                currentCnt={item.cnt}
                expectCnt={item.totalCnt}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectInfo;
