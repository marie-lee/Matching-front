import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { PATHS } from '@/routes/paths';

import CenteredLayout from '@/layouts/centerd/centered-layout';
import MainLayout from '@/layouts/main/main-layout';

// ----------------------------------------------------------------------

// 로그인
const SignInPage = lazy(() => import('@/pages/auth/sign-in-page'));

//회원가입
const SignUpPage = lazy(() => import('@/pages/auth/sign-up-page'));

// ----------------------------------------------------------------------

const auth = {
  path: 'auth',
  children: [
    {
      index: true,
      element: <Navigate to={PATHS.auth.signIn} />,
    },
    {
      path: 'sign-in',
      element: <CenteredLayout />,
      children: [
        {
          index: true,
          element: <SignInPage />,
        },
      ],
    },
    {
      path: 'sign-up',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <SignUpPage />,
        }
      ]
    },
  ],
};

export default auth;
