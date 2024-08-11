import { lazy } from 'react';

import MainLayout from '@/layouts/main/main-layout';

// ----------------------------------------------------------------------

const MatchStatusPage = lazy(() => import('@/pages/match/match-status-page'));

// ----------------------------------------------------------------------

const match = {
  path: 'match',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <MatchStatusPage />,
    },
  ],
};

export default match;
