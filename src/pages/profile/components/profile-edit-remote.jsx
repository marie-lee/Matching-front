import React from 'react';
import { Button, Stack } from '@mui/material';
import ProfilePreview from './profile-edit-preview';
import { postProfile } from '@/services/member';
import _ from 'lodash';

const RemoteControlBox = ({ profileEditForm, onOpen }) => {
  const calculateMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const yearsDifference = end.getFullYear() - start.getFullYear();
    const monthsDifference = end.getMonth() - start.getMonth();

    return yearsDifference * 12 + monthsDifference;
  };
  const getPayload = (_payload) => {
    let payload = _.cloneDeep(_payload);
    console.log('payload', payload);
    const profile = {
      PF_INTRO: payload.profile.PF_INTRO,
      USER_IMG: payload.profile.USER_IMG,
      CAREER: payload.profile.career.map((career) => ({
        CAREER_NM: career.CAREER_NM,
        ENTERING_DT: career.ENTERING_DT,
        // QUIT_DT 가 true면 현재 재직중
        QUIT_DT: career.QUIT_DT === true ? null : career.QUIT_DT,
      })),
      STACK: payload.profile.stack.map((stack) => ({
        ST_NM: stack.ST_NM,
        LEVEL: stack.ST_LEVEL,
      })),
      USER_NM: payload.profile.USER_NM,
      INTRST: payload.profile.interest.map((interest) => interest.INTEREST_NM),
      URL: payload.profile.url.map((url) => ({
        URL: url.URL_ADDR,
        URL_INTRO: url.URL_INTRO,
      })),
    };
    const statusMapping = {
      ACTIVE: '배포',
      COMPLETE: '완료',
      STOP: '중단',
    };

    const portfolios = payload.portfolioInfo.map(
      (portfolio, index) => (
        console.log('portfolio', portfolio),
        {
          PFOL_NM: portfolio.PFOL_NM,
          INTRO: portfolio.INTRO,
          // 시작일 종료일 기간
          PERIOD: calculateMonths(portfolio.START_DT, portfolio.END_DT),
          START_DT: portfolio.START_DT,
          END_DT: portfolio.END_DT,
          MEM_CNT: portfolio.MEM_CNT,
          CONTRIBUTION: portfolio.CONTRIBUTION,

          SERVICE_STTS: statusMapping[portfolio.SERVICE_STTS],
          RESULT: portfolio.RESULT,
          STACK: portfolio.stack.map((stack) => {
            return stack;
          }),
          // 만약 ROLE이 null이면 빈 배열로 만들어줌
          ROLE:
            portfolio.role === undefined ?
              []
            : portfolio.role.map((role) => {
                return role.ROLE_NM;
              }),
          URL: portfolio.url.map((url) => {
            return {
              URL: url.URL,
              URL_INTRO: url.URL_INTRO,
              RELEASE_YN: 0,
              OS: 'WINDOWS',
            };
          }),
          MEDIA:
            portfolio.IMG_SUB === null ?
              []
            : portfolio.IMG_SUB.map((img, index) => ({
                // 이거 물어보기
                URL: img.URL,
                MAIN_YN: index === 0 ? '1' : '0',
              })),
        }
      ),
    );

    return {
      profile: profile,
      portfolios,
      portfolios_file: payload.portfolioInfo.map((portfolio) => {
        if (portfolio.IMG_SUB === null) {
          return null;
        }
        return portfolio.IMG_SUB.map((img) => img.FILE);
      }, null),
    };
  };

  const onSubmit = profileEditForm.handleSubmit(async (_payload) => {
    const payload = getPayload(_payload);

    const formData = new FormData();
    formData.append('profile', JSON.stringify(payload.profile));
    // 프로필 사진이 존재하면 추가
    if (payload.portfolios_file === null) {
      formData.append('profile[USER_IMG]', payload.portfolios_file[0][0]);
    }
    // 포트폴리오가 존재하면 추가
    if (payload.portfolios.length > 0) {
      payload.portfolios_file.forEach((portfolio, pIndex) => {
        if (portfolio !== null) {
          // null 체크 추가
          portfolio.forEach((file, fIndex) => {
            formData.append(
              `portfolios[${pIndex}][MEDIA][${fIndex}][file]`,
              file,
            );
          });
        }
      });
    }
    formData.append('portfolios', JSON.stringify(payload.portfolios));

    // 폼 데이터에 들어가는 값 확인 보기 편하게 가공
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      const res = await postProfile(formData);
      if (res?.status === 200) {
        setPreviewOpen(false);
        navigate(-1);
      }
    } catch (error) {
      console.log('error', error);
    }
  });

  return (
    <Stack p={2} spacing={4} bgcolor={'background.default'}>
      <Stack spacing={1}>
        <Button variant="outlined" color="primary" sx={{ borderRadius: '4px' }}>
          경력
        </Button>
        <Button variant="outlined" color="primary" sx={{ borderRadius: '4px' }}>
          주요 스킬
        </Button>
        <Button variant="outlined" color="primary" sx={{ borderRadius: '4px' }}>
          관심분야
        </Button>
        <Button variant="outlined" color="primary" sx={{ borderRadius: '4px' }}>
          링크
        </Button>
        <Button variant="outlined" color="primary" sx={{ borderRadius: '4px' }}>
          포트폴리오
        </Button>
      </Stack>

      <Stack spacing={1}>
        <ProfilePreview
          onOpen={onOpen}
          profileEditForm={profileEditForm}
        ></ProfilePreview>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: '4px' }}
          onClick={onSubmit}
        >
          저장
        </Button>
      </Stack>
    </Stack>
  );
};

export default RemoteControlBox;
