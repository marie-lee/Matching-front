import MainLayout from '@/layouts/main/main-layout';
import { lazy } from 'react';

const ProfilePortfolioPage = lazy(
  () => import('@/pages/profile/profile-portfolio-page'),
);

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
