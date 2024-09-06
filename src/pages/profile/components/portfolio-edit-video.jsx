import { Box, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';

const PortfolioVideo = ({ index, portfolioFieldArray, profileEditForm }) => {
  const { setValue } = profileEditForm;
  const videofileInputRef = useRef(null);
  const [video, setVideo] = useState(null);

  const handleVideoFileChange = (index) => (event) => {
    if (portfolioFieldArray.fields[index].VIDEO === null) {
      portfolioFieldArray.fields[index].VIDEO = [];
    }

    const currentVideoCount = portfolioFieldArray.fields[index].VIDEO ? 1 : 0;
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);

    // 만약 비디오를 기존에 추가한 경우, DEL_YN을 1로 설정
    if (currentVideoCount > 0) {
      console.log('DEL_YN', portfolioFieldArray.fields[index].VIDEO.DEL_YN);
      portfolioFieldArray.fields[index].VIDEO.DEL_YN = 1;
      setValue(
        `portfolioInfo[${index}].VIDEO`,
        portfolioFieldArray.fields[index].VIDEO,
      );
    }

    setVideo({ URL: videoUrl });
    setValue(`portfolioVideoFile[${index}]`, { file: file, pindex: index }); // 인덱스를 변수로 포함
  };

  const handleAddVideoClick = () => {
    videofileInputRef.current.click();
  };

  // 처음 렌더링 시 비디오가 존재하면 미리보기 비디오로 설정
  useEffect(() => {
    if (profileEditForm.getValues('portfolioInfo')[index].VIDEO) {
      setVideo(profileEditForm.getValues('portfolioInfo')[index].VIDEO);
    }
  }, []);

  return (
    <>
      <input
        key={`video_${index}`}
        type="file"
        ref={videofileInputRef}
        onChange={handleVideoFileChange(index)}
        style={{ display: 'none' }} // 파일 입력 요소 숨기기
        accept="video/*" // 오직 비디오 파일만 허용
      />
      <Button
        color="primary"
        variant={'outlined'}
        onClick={handleAddVideoClick}
      >
        <PersonalVideoIcon sx={{ mr: 1 }}></PersonalVideoIcon>
        동영상 추가 ({video ? 1 : 0}
        /1)
      </Button>
      {video === null ?
        <Box mt={2}>동영상이 없습니다.</Box>
      : <>
          {/* 비디오 URL이 있을 때만 비디오 컴포넌트 표시 */}
          {video && (
            <Box mt={2}>
              <video src={video.URL} controls width="100%"></video>
            </Box>
          )}
        </>
      }
    </>
  );
};

export default PortfolioVideo;
