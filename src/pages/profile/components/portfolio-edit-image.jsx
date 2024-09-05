import React, { useRef, useState } from 'react';
import {
  ImageList,
  ImageListItem,
  IconButton,
  Box,
  Typography,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';

const PortfolioImageList = ({
  profileEditForm,
  portfolioFieldArray,
  index,
}) => {
  const imagefileInputRefs = useRef([]);
  const { setValue } = profileEditForm;

  // 파일 입력 요소에 대한 참조를 설정
  if (!imagefileInputRefs.current[index]) {
    imagefileInputRefs.current[index] = React.createRef();
  }

  // 이미지를 상태로 관리
  const [pimages, setPimages] = useState([]);

  const handleImageFileChange = (index) => (event) => {
    console.log('handleImageFileChange', index);

    // DEL_YN이 true인 이미지를 제외한 갯수를 확인
    if (pimages.filter((img) => !img.DEL_YN).length >= 4) {
      alert('이미지는 최대 4개까지 업로드 가능합니다.');
      return;
    }

    const file = event.target.files[0];

    const portfolioNewImage = {
      ID: Date.now(),
      file: file,
      MAIN_YN: false,
    };

    const newImage = {
      ID: Date.now(),
      URL: URL.createObjectURL(file),
      MAIN_YN: false,
    };

    // 이미지 추가 대표 이미지가 없다면 첫번째 이미지를 대표 이미지로 설정
    if (portfolioFieldArray.fields[index].IMG === null) {
      console.log('대표 이미지가 없습니다.');
      newImage.MAIN_YN = true;
      portfolioNewImage.MAIN_YN = true;
    }

    // 상태 업데이트
    const updatedImages = [...pimages, newImage];
    setPimages(updatedImages);
    if (portfolioFieldArray.fields[index].IMG === null) {
      portfolioFieldArray.fields[index].IMG = [];
    }
    portfolioFieldArray.fields[index].IMG.push(portfolioNewImage);
    console.log(
      'portfolioFieldArray.fields[index].IMG',
      portfolioFieldArray.fields[index].IMG,
    );

    // 이미지 상태 업데이트
    setValue(
      `portfolioInfo[${index}].IMG`,
      portfolioFieldArray.fields[index].IMG,
    );
  };

  const handleAddImageClick = (index) => {
    console.log('handleAddImageClick', index);
    if (
      imagefileInputRefs.current[index] &&
      imagefileInputRefs.current[index].current
    ) {
      imagefileInputRefs.current[index].current.click();
    }
  };

  // 이미지 클릭 이벤트 핸들러
  const handleImageClick = (image) => {
    console.log('handleImageClick', image);
    // 클릭한 이미지를 메인 이미지로 설정
    const mainImage = pimages.map((item) => {
      if (item.ID === image.ID) {
        item.MAIN_YN = true;
      } else {
        item.MAIN_YN = false;
      }
      return item;
    });
    setPimages(mainImage);
    // 이미지 상태 업데이트 새로 올린 파일의 경우 예외 처리를 해야함
    const updatedPortfolioImages = portfolioFieldArray.fields[index].IMG.map(
      (img) => {
        if (img.ID === image.ID) {
          return {
            ...img,
            MAIN_YN: true,
          };
        } else {
          return {
            ...img,
            MAIN_YN: false,
          };
        }
      },
    );
    setValue(`portfolioInfo[${index}].IMG`, updatedPortfolioImages);
    portfolioFieldArray.fields[index].IMG = updatedPortfolioImages;
  };

  const handleRemoveImage = (portfolioIndex, imageIndex) => {
    console.log('handleRemoveImage', portfolioIndex, imageIndex);
    // 이미지 삭제
    const updatedImages = pimages.filter((item, index) => index !== imageIndex);
    setPimages(updatedImages);

    // 삭제된 이미지 값에 DEL_YN 추가
    const deletedImage =
      portfolioFieldArray.fields[portfolioIndex].IMG[imageIndex];
    if (deletedImage.ID) {
      deletedImage.DEL_YN = true;
    }

    // 이미지 상태 업데이트
    const updatedPortfolioImages = portfolioFieldArray.fields[
      portfolioIndex
    ].IMG.map((img, index) => {
      if (index === imageIndex) {
        return {
          ...img,
          DEL_YN: true,
        };
      }
      return img;
    });

    // 만약 삭제된 이미지가 파일로 올린거라면 객체를 삭제
    if (deletedImage.file) {
      updatedPortfolioImages.splice(imageIndex, 1);
    }

    // 만약 삭제한 이미지가 대표 이미지라면 다음 대표 이미지를 설정
    if (deletedImage.MAIN_YN && updatedPortfolioImages.length > 0) {
      updatedPortfolioImages[0].MAIN_YN = true;
    }

    // 상태 업데이트
    setValue(`portfolioInfo[${portfolioIndex}].IMG`, updatedPortfolioImages);
    portfolioFieldArray.fields[portfolioIndex].IMG = updatedPortfolioImages;
  };

  return (
    <>
      <Button
        color="primary"
        variant={'outlined'}
        onClick={() => handleAddImageClick(index)}
      >
        <ImageIcon sx={{ mr: 1 }}></ImageIcon>
        이미지 추가 (
        {portfolioFieldArray.fields[index].IMG ?
          portfolioFieldArray.fields[index].IMG.length
        : 0}{' '}
        / 4)
      </Button>
      <input
        key={`image_${index}`}
        type="file"
        accept="image/*"
        hidden
        ref={imagefileInputRefs.current[index]}
        onChange={handleImageFileChange(index)}
      />
      <ImageList
        sx={{ width: '100%', height: 'auto' }}
        cols={4}
        rowHeight={'auto'}
      >
        {portfolioFieldArray.fields[index].IMG === null ?
          <Typography>이미지가 없습니다.</Typography>
        : <>
            {portfolioFieldArray.fields[index].IMG.map((item, imageIndex) =>
              // item.DEL_YN 이 true 이면 삭제된 이미지로 간주
              item.DEL_YN ? null : (
                <ImageListItem key={`image_${index}_${imageIndex}`}>
                  <img
                    src={item.URL || URL.createObjectURL(item.file)}
                    alt={item.NAME}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                    }} // 크기 조정
                    onClick={() =>
                      handleImageClick(
                        portfolioFieldArray.fields[index].IMG[imageIndex],
                      )
                    }
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      color: 'white',
                    }}
                    onClick={() => handleRemoveImage(index, imageIndex)}
                  >
                    <CloseIcon sx={{ stroke: '#111111', strokeWidth: 1 }} />
                  </IconButton>
                  {item.MAIN_YN && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: '2px 8px',
                        fontSize: '0.875rem',
                      }}
                    >
                      대표 이미지
                    </Box>
                  )}
                </ImageListItem>
              ),
            )}
          </>
        }
      </ImageList>
    </>
  );
};

export default PortfolioImageList;
