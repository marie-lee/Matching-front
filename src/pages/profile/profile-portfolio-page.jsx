import { Backdrop, Button, Grid, Stack, Typography } from '@mui/material';

import { ProfileDetails, PortfolioList } from '@/pages/profile/components';
import {
  CAREERS,
  INTRSTS,
  PORTFOLIOS,
  STACKS,
  URLS,
} from '@/pages/profile/constants';

const ProfilePortfolioPage = () => {
  const hasProfile = true;
  const hasPortfolio = true;

  const renderEmptyContent = () => {
    return (
      <Backdrop open={!hasProfile && !hasPortfolio} sx={{ zIndex: 2 }}>
        <Grid
          item
          container
          xs={8}
          lg={5}
          p={3}
          direction={'column'}
          bgcolor={'background.default'}
        >
          <Stack spacing={2}>
            <Typography textAlign={'center'}>
              아직 등록한 프로필과 포트폴리오가 없어요! 🥲
            </Typography>
            <Button>등록하러 가기</Button>
          </Stack>
        </Grid>
      </Backdrop>
    );
  };

  return (
    <Grid container spacing={3}>
      {renderEmptyContent()}

      <Grid item xs={12} md={4}>
        <ProfileDetails
          data={{
            careers: CAREERS,
            stacks: STACKS,
            intrsts: INTRSTS,
            urls: URLS,
          }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <PortfolioList
          hasProfile={hasProfile}
          hasPortfolio={hasPortfolio}
          data={PORTFOLIOS}
        />
      </Grid>
    </Grid>
  );
};

export default ProfilePortfolioPage;
