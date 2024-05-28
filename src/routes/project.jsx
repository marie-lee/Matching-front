import MainLayout from '@/layouts/main/main-layout';
import { lazy } from 'react';

// ----------------------------------------------------------------------

const ProjectListPage = lazy(() => import('@/pages/project/project-list-page'));

// ----------------------------------------------------------------------

const project = {
  path: 'project',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <ProjectListPage />,
    },
  ],
};

export default project;
