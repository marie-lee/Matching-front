import { lazy } from 'react';

import MainLayout from '@/layouts/main/main-layout';

// ----------------------------------------------------------------------

const ProfilePortfolioPage = lazy(
  () => import('@/pages/profile/profile-portfolio-page'),
);

const ProfileEditPage = lazy(() => import('@/pages/profile/profile-edit-page'));

// ----------------------------------------------------------------------

const profiles = {
  path: 'profiles',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <ProfilePortfolioPage />,
    },
    {
      path: 'edit-profile',
      element: <ProfileEditPage />,
    },
  ],
};

export default profiles;
