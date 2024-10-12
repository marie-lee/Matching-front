import * as yup from 'yup';

export const projectEditFormDefaultValues = {
  endDate: null,
};

export const projectEditFormSchema = yup.object().shape({
  endDate: yup.mixed().required('프로젝트 종료일을 입력해주세요'),
});
