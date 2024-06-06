import { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { instance } from '@/services/config';

// ----------------------------------------------------------------------

const AxiosInterceptor = () => {
  const { token } = useSelector(
    ({ auth }) => ({
      token: auth.token,
    }),
    shallowEqual,
  );

  const requestInterceptor = (config) => {
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  };

  const requestErrorInterceptor = (error) => {
    return Promise.reject(error);
  };

  const responseInterceptor = (response) => {
    console.log(response);

    return response;
  };

  const responseErrorInterceptor = (error) => {
    return Promise.reject(error?.response);
  };

  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use(
      requestInterceptor,
      requestErrorInterceptor,
    );

    const resInterceptor = instance.interceptors.response.use(
      responseInterceptor,
      responseErrorInterceptor,
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [token]);

  return <></>;
};

export default AxiosInterceptor;
