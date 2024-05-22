import { Outlet } from 'react-router-dom';

import { ContentGuest, HeaderGuest } from '@/layouts/guest/components';

const GuestLayout = () => {
  return (
    <>
      <HeaderGuest />
      <ContentGuest>
        <Outlet />
      </ContentGuest>
    </>
  );
};

export default GuestLayout;
