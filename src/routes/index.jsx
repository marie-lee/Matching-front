import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import account from '@/routes/account';
import profile from '@/routes/profile';
import recommend from '@/routes/recommend';
import NotFoundPage from '@/pages/error/404';
import GuestLayout from '@/layouts/guest/guest-layout';

// ----------------------------------------------------------------------

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        {
          index: true,
          element: <div>게스트</div>,
        },
      ],
    },

    account,
    profile,
    recommend,
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
};

export default Router;
