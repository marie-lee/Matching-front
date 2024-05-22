import { lazy } from 'react';

import MainLayout from '@/layouts/main/main-layout';

// ----------------------------------------------------------------------

const ProfilePortfolioPage = lazy(
  () => import('@/pages/profile/profile-portfolio-page'),
);

// ----------------------------------------------------------------------

const profile = {
  path: 'profile',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <ProfilePortfolioPage />,
    },
  ],
};

export default profile;
