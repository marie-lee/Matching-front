import { useRoutes } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { lazy } from 'react';

import auth from '@/routes/auth';
import profiles from '@/routes/profiles';
import recommend from '@/routes/recommend';

import NotFoundPage from '@/pages/error/404';
import GuestLayout from '@/layouts/guest/guest-layout';
import MainLayout from '@/layouts/main/main-layout';

// ----------------------------------------------------------------------

const GuestPage = lazy(() => import('@/pages/guest/guest-page'));

// ----------------------------------------------------------------------

const Router = () => {
  const { isSignIn } = useSelector(
    ({ auth }) => ({
      isSignIn: auth.isSignIn,
    }),
    shallowEqual,
  );

  const main = {
    path: '/',
    element: isSignIn ? <MainLayout /> : <GuestLayout />,
    children: [
      {
        index: true,
        element: isSignIn ? <div></div> : <GuestPage />,
      },
    ],
  };

  // ----------------------------------------------------------------------

  return useRoutes([
    // 메인
    main,

    // 인증
    auth,
    // 프로필&포트폴리오
    profiles,
    // 추천
    recommend,

    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
};

export default Router;
