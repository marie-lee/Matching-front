import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { PATHS } from '@/routes/paths';

import CenteredLayout from '@/layouts/centerd/centered-layout';
import MainLayout from '@/layouts/main/main-layout';
import AuthLayout from '@/layouts/auth/auth-layout';

// ----------------------------------------------------------------------

// 로그인
const SignInPage = lazy(() => import('@/pages/auth/sign-in-page'));

// 회원가입
const SignUpPage = lazy(() => import('@/pages/auth/sign-up-page'));

// 아이디 찾기
const FindIdPage = lazy(() => import ('@/pages/auth/find-id-page'));

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
    {
      path: 'find-id',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <FindIdPage />,
        }
      ]
    },
  ],
};

export default auth;
