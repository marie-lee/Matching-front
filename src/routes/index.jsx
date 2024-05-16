import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import account from '@/routes/account';

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
      ],
    },

    account,

    {
      path: '*',
      element: <div>404 Not Found</div>,
    },
  ]);
};

export default Router;
