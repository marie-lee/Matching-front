import MainLayout from '@/layouts/main/main-layout';
import { lazy } from 'react';

const RecommendPage = lazy(() => import('@/pages/recommend/recommend-page'));

const recommend = {
  path: 'recommend',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <RecommendPage />,
    },
  ],
};

export default recommend;
