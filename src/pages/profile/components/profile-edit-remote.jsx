import React from 'react';
import { Button, Stack } from '@mui/material';
import ProfilePreview from './profile-edit-preview';
import { postProfile } from '@/services/member';
import _ from 'lodash';

const RemoteControlBox = ({ profileEditForm, onOpen }) => {
  const getPayload = (_payload) => {
    let payload = _.cloneDeep(_payload);
    const profile = {
      PF_INTRO: payload.profile[0].PF_INTRO,
      USER_IMG: payload.profile[0].USER_IMG,
      CAREER: payload.profile[0].carrer.map((career) => ({
        CAREER_NM: career.CARRER_NM,
        ENTERING_DT: career.ENTERING_DT,
        QUIT_DT: career.QUIT_DT,
      })),
      STACK: payload.profile[0].stack.map((stack) => ({
        ST_NM: stack.ST_NM,
        LEVEL: stack.LEVEL,
      })),
      USER_NM: payload.profile[0].USER_NM,
      INTRST: payload.profile[0].interest.map(
        (interest) => interest.INTEREST_NM,
      ),
      URL: payload.profile[0].url.map((url) => ({
        URL: url.URL_ADDR,
        URL_INTRO: url.URL_INTRO,
      })),
    };

    const portfolios = payload.portfolioInfo.map(
      (portfolio, index) => (
        console.log('portfolio', portfolio),
        {
          PFOL_NM: portfolio.PFOL_NM,
          INTRO: portfolio.INTRO,
          PERIOD: String(portfolio.PERIOD),
          START_DT: portfolio.START_DT,
          END_DT: portfolio.END_DT,
          MEM_CNT: portfolio.MEM_CNT,
          CONTRIBUTION: portfolio.CONTRIBUTION,
          SERVICE_STTS: portfolio.SERVICE_STTS,
          RESULT: portfolio.RESULT,
          STACK: portfolio.stack.map((stack) => {
            return { ST_NM: stack.ST_NM };
          }),
          ROLE: portfolio.role.map((role) => role.ROLE_NM),
          URL: portfolio.url.map((url) => {
            return {
              URL: url.URL,
              URL_INTRO: '임의로 추가',
              RELEASE_YN: 0,
              OS: url.OS,
            };
          }),
          MEDIA: portfolio.IMG_SUB.map((img, index) => ({
            URL: img,
            MAIN_YN: index === 0 ? '1' : '0',
          })),
        }
      ),
    );
    console.log('profile', { profile, portfolios });

    return {
      profile: profile,
      portfolios,
    };
  };

  const onSubmit = profileEditForm.handleSubmit(async (_payload) => {
    console.log('onSubmit');
    const payload = getPayload(_payload);

    try {
      const res = await postProfile(payload);
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
