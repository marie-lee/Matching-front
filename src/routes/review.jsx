import { lazy } from 'react';

import SidebarLayout from '@/layouts/main/sidebar-layout';

// ----------------------------------------------------------------------

const PeerReviewPage = lazy(() => import('@/pages/review/review-page'));

// ----------------------------------------------------------------------

const review = {
  path: 'review',
  element: <SidebarLayout />,
  children: [
    {
      index: true,
      element: <PeerReviewPage />,
    },
  ],
};

export default review;
