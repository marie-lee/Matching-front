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
