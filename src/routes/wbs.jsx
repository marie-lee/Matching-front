import { lazy } from 'react';

import SidebarLayout from '@/layouts/main/sidebar-layout';

// ----------------------------------------------------------------------

const CreateWbsPage = lazy(() => import('@/pages/wbs/create-wbs'));

const CreateWbsTemplatePage = lazy(
  () => import('@/pages/wbs/create-wbs-template'),
);
const BasicInfoPage = lazy(() => import('@/pages/wbs/basic-info'));
const WbsInput = lazy(() => import('@/pages/wbs/wbs-input'));
const WbsView = lazy(() => import('@/pages/wbs/wbs-view'));
// ----------------------------------------------------------------------

const wbs = {
  path: 'wbs',
  element: <SidebarLayout />,
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
    {
      path: 'wbs-input',
      element: <WbsInput />,
    },
    {
      path: 'wbs-view',
      element: <WbsView />,
    },
  ],
};

export default wbs;
