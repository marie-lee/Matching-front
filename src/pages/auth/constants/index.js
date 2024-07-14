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

export const termsDefaultValues = {
  agreeService: false,
  agreePrivacy: false,
  over14: false,
};

export const userInfoDefaultValues = {
  name: '',
  email: '',
  authCode: '',
  password: '',
  confirmPassword: '',
};

export const termsSchema = yup.object().shape({
  agreeService: yup
    .boolean()
    .oneOf([true], '서비스 이용 약관에 동의해야 합니다.')
    .required('서비스 이용 약관에 동의해야 합니다.'),
  agreePrivacy: yup
    .boolean()
    .oneOf([true], '개인정보 처리 방침에 동의해야 합니다.')
    .required('개인정보 처리 방침에 동의해야 합니다.'),
  over14: yup
    .boolean()
    .oneOf([true], '만 14세 이상이어야 합니다.')
    .required('만 14세 이상이어야 합니다.'),
});

export const userInfoSchema = yup.object().shape({
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

// ----------------------------------------------------------------------
// 아이디 찾기
// ----------------------------------------------------------------------

export const findIdFormDefaultValues = {
  name: '',
  phone: '',
};

export const findIdFormSchema = yup.object().shape({
  name: yup.string().required('이름을 입력해 주세요'),
  phone: yup.string().required('전화번호를 입력해 주세요'),
});

// ----------------------------------------------------------------------
// 비밀번호 찾기
// ----------------------------------------------------------------------

export const findPwFormDefaultValues = {
  name: '',
  email: '',
  authCode: '',
};

export const findPwFormSchema = yup.object().shape({
  name: yup.string().required('이름을 입력해 주세요'),
  email: yup.string().email('유효한 이메일을 입력해 주세요').required('이메일을 입력해 주세요'),
  authCode: yup.string().required('인증번호를 입력해 주세요'),
});

// ———————————————————————————————————
// 비밀번호 재설정
// ———————————————————————————————————

export const resetPwFormDefaultValues = {
  newPassword: '',
  confirmPassword: '',
};

export const resetPwFormSchema = yup.object().shape({
  newPassword: yup.string().required('새 비밀번호를 입력해 주세요'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력해 주세요'),
});