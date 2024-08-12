import { lazy } from 'react';

import SidebarLayout from '@/layouts/main/sidebar-layout';

// ----------------------------------------------------------------------

const PeerReviewPage = lazy(() => import('@/pages/review/review-page'));
const PeerReviewInputPage = lazy(
  () => import('@/pages/review/review-input-page'),
);

// ----------------------------------------------------------------------

const review = {
  path: 'review',
  element: <SidebarLayout />,
  children: [
    {
      index: true,
      element: <PeerReviewPage />,
    },
    {
      path: 'input',
      element: <PeerReviewInputPage />,
    },
  ],
};

export default review;
