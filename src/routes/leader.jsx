import { lazy } from 'react';

import SidebarLayout from '@/layouts/main/sidebar-layout';

// ----------------------------------------------------------------------

const ProjectLeaderPage = lazy(
  () => import('@/pages/leader/project-leader-page'),
);

// ----------------------------------------------------------------------

const leader = {
  path: 'leader',
  element: <SidebarLayout />,
  children: [
    {
      index: true,
      element: <ProjectLeaderPage />,
    },
  ],
};

export default leader;
