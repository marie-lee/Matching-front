import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import account from '@/routes/account';

import NotFoundPage from '@/pages/error/404';
import Home from '@/pages/home';

// ----------------------------------------------------------------------

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to={'/home'} replace />,
        },
        {
          path: 'home',
          element: <Home />,
        },
      ],
    },

    account,

    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
};

export default Router;
