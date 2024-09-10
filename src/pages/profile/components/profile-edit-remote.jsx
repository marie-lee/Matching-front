import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import ProfilePreview from './profile-edit-preview';
import { postProfile } from '@/services/member';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import LoadingPopup from './loading';

const RemoteControlBox = ({ profileEditForm, onOpen }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const calculateMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const yearsDifference = end.getFullYear() - start.getFullYear();
    const monthsDifference = end.getMonth() - start.getMonth();

    return yearsDifference * 12 + monthsDifference;
  };

  const getPayload = (_payload) => {
    let payload = _.cloneDeep(_payload);
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
      (portfolio, index) =>
        (
          // console.log('portfolio', portfolio),
          console.log('portfolio', portfolio.url),
          {
            PFOL_SN: portfolio.PFOL_SN,
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
              portfolio.role === null ?
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
            // 만약에 IMG 가 file, MAIN_YN 만 가지고 있다면 { MAIN_YN: MAIN_YN } 으로 만들어줌
            // 만약에 IMG 가 URL, MAIN_YN 만 가지고 있다면 { URL: URL, MAIN_YN: MAIN_YN } 으로 만들어줌
            // 만약에 DEL_YN을 가지고 있으면 { URL: URL, MAIN_YN: MAIN_YN, DEL_YN: DEL_YN } 으로 만들어줌
            // MAIN_YN 이 true 면 1 false 면 0
            MEDIA: portfolio.IMG.map((img) => {
              console.log('img', img);
              if (img.file && img.MAIN_YN !== undefined) {
                return {
                  MAIN_YN: img.MAIN_YN ? 1 : 0,
                };
              } else if (img.URL && img.MAIN_YN !== undefined) {
                const result = {
                  URL: img.URL,
                  MAIN_YN: img.MAIN_YN ? 1 : 0,
                };
                if (img.DEL_YN !== undefined) {
                  result.DEL_YN = img.DEL_YN;
                }
                return result;
              } else {
                // 기본적으로 처리할 수 없는 경우 빈 객체 반환
                return {};
              }
            }),
            VIDEO: portfolio.VIDEO,
          }
        ),
    );
    return {
      profile: profile,
      portfolios,
      portfolios_images: payload.portfolioInfo.map((portfolio) => {
        return portfolio.IMG;
      }),
      PORTFOLIO_VIDEO:
        payload.portfolioVideoFile ?
          payload.portfolioVideoFile.map((video) => video)
        : [],
      USER_IMG: payload.USER_IMG,
    };
  };

  const onSubmit = profileEditForm.handleSubmit(async (_payload) => {
    setIsLoading(true); // 요청 시작 시 로딩 상태를 true로 설정
    const payload = getPayload(_payload);

    const formData = new FormData();
    formData.append('profile', JSON.stringify(payload.profile));
    // 프로필 사진이 존재하면 추가
    if (payload.USER_IMG !== undefined && payload.USER_IMG !== null) {
      formData.append('profile[USER_IMG]', payload.USER_IMG);
    }
    // 포트폴리오가 존재하면 추가
    const pindexCounters = {};
    // 포트폴리오 이미지가 존재하면 추가
    if (payload.portfolios_images) {
      payload.portfolios_images.forEach((images, pindex) => {
        images.forEach((image) => {
          // pindex에 대한 카운터가 없으면 초기화
          if (!pindexCounters[pindex]) {
            pindexCounters[pindex] = 0;
          }
          // image.file이 존재하지 않으면 formData에 추가하지 않음
          if (image.file === undefined) {
            pindexCounters[pindex]++;
            return;
          }
          // 현재 pindex의 카운터 값을 사용하여 formData에 추가
          formData.append(
            `portfolios[${pindex}][MEDIA][${pindexCounters[pindex]}][file]`,
            image.file,
          );
          // pindex의 카운터를 증가
          pindexCounters[pindex]++;
        });
      });
    }
    formData.append('portfolios', JSON.stringify(payload.portfolios));

    // 비디오 업로드가 존재하면 추가
    if (payload.PORTFOLIO_VIDEO) {
      payload.PORTFOLIO_VIDEO.forEach((video) => {
        console.log('video', video);
        if (video === undefined) {
          return;
        }
        formData.append(`portfolios[${video.pindex}][VIDEO][file]`, video.file);
      });
    }

    // 폼 데이터에 들어가는 값 확인 보기 편하게 가공
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      const res = await postProfile(formData);
      if (res?.status === 200) {
        // setPreviewOpen(false);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false); // 요청 종료 시 로딩 상태를 false로 설정
      navigate(-1);
    }
  });

  return (
    <Stack p={2} spacing={4} bgcolor={'background.default'}>
      {isLoading && <LoadingPopup />}
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
