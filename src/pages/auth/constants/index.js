import * as yup from 'yup';

// ----------------------------------------------------------------------
// 로그인
// ----------------------------------------------------------------------

export const sigInInFormDefaultValues = {
  email: '',
  password: '',
};

export const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 입력해주세요')
    .required('이메일을 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

// ----------------------------------------------------------------------
// 회원가입
// ----------------------------------------------------------------------

export const signUpFormDefualtValues = {
  name: '',
  email: '',
  authCode: '',
  password: '',
  confirmPassword: '',
};

export const signUpFormSchema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요.'),
  email: yup
    .string()
    .email('유효한 이메일을 입력해주세요.')
    .required('이메일을 입력해주세요.'),
  authCode: yup.string().required('인증번호를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력해주세요.'),
});
