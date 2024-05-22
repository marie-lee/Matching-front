import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

import { PATHS } from '@/routes/paths';

import CenteredLayout from '@/layouts/centerd/centered-layout';

// ----------------------------------------------------------------------

const SignInPage = lazy(() => import('@/pages/auth/sign-in-page'));

// ----------------------------------------------------------------------

const auth = {
  path: 'auth',
  element: <CenteredLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={PATHS.auth.signIn} />,
    },
    {
      path: 'sign-in',
      element: <SignInPage />,
    },
  ],
};

export default auth;
