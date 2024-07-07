import { lazy } from 'react';

import MainLayout from '@/layouts/main/main-layout';

// ----------------------------------------------------------------------

const CreateWbsPage = lazy(() => import('@/pages/wbs/create-wbs'));

const CreateWbsTemplatePage = lazy(
  () => import('@/pages/wbs/create-wbs-template'),
);
// ----------------------------------------------------------------------

const wbs = {
  path: 'wbs',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <CreateWbsPage />,
    },
    {
      path: 'create-wbs',
      element: <CreateWbsTemplatePage />,
    },
  ],
};

export default wbs;
