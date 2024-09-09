import { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { instance } from '@/services/config';
import { useToast } from '@/contexts/toast-provider';
import { signOut } from '@/store/auth-slice';
import { PATHS } from '@/routes/paths';

// ----------------------------------------------------------------------

const AxiosInterceptor = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector(
    ({ auth }) => ({
      token: auth.token,
    }),
    shallowEqual,
  );

  const showToast = useCallback(
    (message, type) => {
      toast.show({
        msg: message,
        type,
      });
    },
    [toast],
  );

  const requestInterceptor = (config) => {
    const token = localStorage.getItem('accessToken'); 
    console.log(token)
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`, 
      };
    }
    return config;
  };

  const requestErrorInterceptor = (error) => {
    return Promise.reject(error);
  };

  const responseInterceptor = (response) => {
    return response;
  };

  const responseErrorInterceptor = (error) => {
    const msg = error?.response?.data?.message || error?.response?.data;

    if (error?.response && error?.response?.data) {
      switch (error?.response?.status) {
        case 400:
          showToast(msg, 'warning');
          break;
        case 401:
        case 403:
          // 토큰 만료로 로그아웃 처리
          showToast('로그인 유지시간 만료로, 다시 로그인해 주세요.', 'error');
          dispatch(signOut());
          navigate(PATHS.auth.signIn);
          break;
        default:
          showToast(msg, 'error');
          break;
      }
    }

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

  return null;
};

export default AxiosInterceptor;

