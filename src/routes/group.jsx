import { lazy } from 'react';

import SidebarLayout from '@/layouts/main/sidebar-layout';

// ----------------------------------------------------------------------

const GroupPage = lazy(() => import('@/pages/group/group-page'));
// ----------------------------------------------------------------------

const group = {
  path: 'group',
  element: <SidebarLayout />,
  children: [
    {
      index: true,
      element: <GroupPage />,
    },
  ],
};

export default group;
