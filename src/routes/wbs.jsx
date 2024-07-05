import { lazy } from 'react';

import MainLayout from '@/layouts/main/main-layout';

// ----------------------------------------------------------------------

const CreateWbsPage = lazy(() => import('@/pages/wbs/create-wbs'));

// ----------------------------------------------------------------------

const wbs = {
  path: 'wbs',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <CreateWbsPage />,
    },
  ],
};

export default wbs;
