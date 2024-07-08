import { lazy } from 'react';

import MainLayout from '@/layouts/main/main-layout';

// ----------------------------------------------------------------------

const CreateWbsPage = lazy(() => import('@/pages/wbs/create-wbs'));

const CreateWbsTemplatePage = lazy(
  () => import('@/pages/wbs/create-wbs-template'),
);
const BasicInfoPage = lazy(() => import('@/pages/wbs/basic-info'));
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
    {
      path: 'basic-info',
      element: <BasicInfoPage />,
    },
  ],
};

export default wbs;
