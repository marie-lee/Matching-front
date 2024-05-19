import { Navigate, Outlet } from 'react-router-dom';

import { PATHS } from '@/routes/paths';

const account = {
  path: 'account',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to={PATHS.account.signIn} />,
    },
    {
      path: 'sign-in',
      element: <div>로그인</div>,
    },
  ],
};

export default account;
