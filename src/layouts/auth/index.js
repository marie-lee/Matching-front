import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};
