import { lazy } from 'react';

import SidebarLayout from '@/layouts/main/sidebar-layout';

// ----------------------------------------------------------------------

const TaskDashboardPage = lazy(
  () => import('@/pages/task/task-dashboard-page'),
);

// ----------------------------------------------------------------------

const task = {
  path: 'task',
  element: <SidebarLayout />,
  children: [
    {
      index: true,
      element: <TaskDashboardPage />,
    },
  ],
};

export default task;
