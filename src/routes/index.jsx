import { useRoutes } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { lazy } from 'react';

import auth from '@/routes/auth';
import profiles from '@/routes/profiles';
import project from '@/routes/project';
import recommend from '@/routes/recommend';
import match from '@/routes/match';
import Home from '@/pages/home';
import wbs from '@/routes/wbs';
import task from '@/routes/task';
import review from '@/routes/review';

import NotFoundPage from '@/pages/error/404';
import GuestLayout from '@/layouts/guest/guest-layout';
import MainLayout from '@/layouts/main/main-layout';

// ----------------------------------------------------------------------

const GuestPage = lazy(() => import('@/pages/guest/guest-page'));

// ----------------------------------------------------------------------
const Router = () => {
  const { isSignIn } = useSelector(
    ({ auth }) => ({ isSignIn: auth.isSignIn }),
    shallowEqual,
  );

  const main = {
    path: '/',
    element: isSignIn ? <MainLayout /> : <GuestLayout />,
    children: [
      {
        index: true,
        element: isSignIn ? <Home /> : <GuestPage />,
      },
    ],
  };

  const privateRoutes = [
    main,
    auth,

    profiles,
    project,
    recommend,
    match,
    wbs,
    task,
    review,

    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];

  const publicRoutes = [
    main,
    auth,
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];

  const routes = isSignIn ? privateRoutes : publicRoutes;
  // const routes = privateRoutes;

  return useRoutes(routes);
};

export default Router;
