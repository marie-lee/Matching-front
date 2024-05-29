import MainLayout from '@/layouts/main/main-layout';
import { lazy } from 'react';

// ----------------------------------------------------------------------

const ProjectListPage = lazy(() => import('@/pages/project/project-list-page'));
const ProjectDetailsPage = lazy(
  () => import('@/pages/project/project-details-page'),
);

// ----------------------------------------------------------------------

const project = {
  path: 'project',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <ProjectListPage />,
    },
    {
      path: 'details/:id',
      element: <ProjectDetailsPage />,
    },
  ],
};

export default project;
