import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import 'dayjs/locale/ko';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add'; // Add 아이콘 임포트
import ImageIcon from '@mui/icons-material/Image';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import React, { useRef, useState } from 'react';
import { RhfDatePicker, RhfTextField } from '@/components/hook-form';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { ProfileForm } from './profile-edit-profile-form';
import { CareerForm } from './profile-edit-career-form';
import { SkillForm } from './profile-edit-skill-form';
import { InterestForm } from './profile-edit-interest-form';
import { LinkForm } from './profile-edit-link-form';
import { useTheme } from '@emotion/react';
import PortfolioImageList from './portfolio-edit-image';

const FormGroup = ({ title, children }) => {
  return (
    <Stack p={2} spacing={2} bgcolor={'background.default'}>
      <Typography
        component={'p'}
        variant={'xl'}
        fontWeight={'fontWeightMedium'}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['백엔드', '프론트엔드', '기획', '디자인'];

const PortfolioForm = ({ profileEditForm }) => {
  console.log('render PortfolioForm');
  const theme = useTheme();
  const { control, setValue } = useFormContext();
  const [stackName, setStackName] = useState('');
  const videofileInputRef = useRef(null);
  const [mainImage, setMainImage] = useState(null);

  // 이미지 클릭 이벤트 핸들러
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  // 프로필 포트폴리오
  const portfolioFieldArray = useFieldArray({
    control,
    name: 'portfolioInfo',
  });
  // 링크 초기값 설정
  const initialLinks = portfolioFieldArray.fields.map(
    (field) => field.url || [],
  );
  // 스택 초기값 설정
  const initialStacks = portfolioFieldArray.fields.map(
    (field) => field.stack || [],
  );

  const [links, setLinks] = useState(initialLinks);
  const [stacks, setStacks] = useState(initialStacks);

  const handleAppendPortfolio = () => {
    portfolioFieldArray.append({
      PFOL_NM: '',
      START_DT: '',
      END_DT: '',
      INTRO: '',
      ROLE: [],
      CONTRIBUTION: '',
      MEM_CNT: '',
      stack: [],
      SERVICE_STTS: '',
      RESULT: '',
      url: [],
      MEDIA: [],
      IMG_SUB: [],
    });

    setLinks([...links, []]);
    setStacks([...stacks, []]);
  };

  const handleAppendStack = (pindex) => {
    setStacks([...stacks, stacks[pindex].push({ ST_NM: stackName })]);
    portfolioFieldArray.fields[pindex].stack.push({ ST_NM: stackName });
  };

  const handleAppendLink = (index) => {
    setLinks([...links, { URL: '', DESCRIPTION: '' }]);
    portfolioFieldArray.fields[index].URL.push({ URL: '', DESCRIPTION: '' });
  };

  const handleAddVideoClick = () => {
    videofileInputRef.current.click();
  };

  const handleRemoveImage = (portfolioIndex, imageIndex) => {
    const updatedImages = portfolioFieldArray.fields[
      portfolioIndex
    ].IMG_SUB.filter((_, idx) => idx !== imageIndex);
    profileEditForm.setValue('portfolioImages', updatedImages);
    portfolioFieldArray.update(portfolioIndex, {
      ...portfolioFieldArray.fields[portfolioIndex],
      IMG_SUB: updatedImages,
    });
  };

  const handleVideoFileChange = (index) => (event) => {
    const currentVideoCount =
      portfolioFieldArray.fields[index].VIDEO_URL.length;
    if (currentVideoCount >= 1) {
      alert('비디오는 최대 1개까지 업로드 가능합니다.');
      return;
    }
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    portfolioFieldArray.update(index, {
      ...portfolioFieldArray.fields[index],
      VIDEO_URL: {
        URL: videoUrl,
        NAME: file.name,
      },
    });
  };

  const handleRemovePortfolio = (index) => {
    portfolioFieldArray.remove(index);
  };

  const handleDeleteStack = (portfolioIndex, stackIndex) => {
    const updatedStacks = stacks.filter((_, idx) => idx !== stackIndex);
    setValue(`portfolioInfo[${portfolioIndex}].stack`, updatedStacks);
    setStacks(updatedStacks);
  };

  console.log('portfolioFieldArray', portfolioFieldArray.fields);

  return (
    <Stack spacing={2}>
      {portfolioFieldArray.fields.map((entry, index) => (
        <Stack
          key={entry.id}
          spacing={2}
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '4px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="lg" fontWeight={'fontWeightMedium'}>
              프로젝트{index + 1}
            </Typography>
            <IconButton onClick={() => handleRemovePortfolio(index)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <RhfTextField
            label={'프로젝트명'}
            name={`portfolioInfo[${index}].PFOL_NM`}
            variant={'outlined'}
            size={'medium'}
          />
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <RhfDatePicker
              name={`portfolioInfo[${index}].START_DT`}
              label={'시작일'}
              views={['year', 'month']}
              size={'medium'}
              format={'YYYY-MM'}
              sx={{ flexGrow: 1 }}
            />
            <RhfDatePicker
              name={`portfolioInfo[${index}].END_DT`}
              label={'종료일'}
              views={['year', 'month']}
              size={'medium'}
              format={'YYYY-MM'}
              sx={{ flexGrow: 1 }}
            />
          </Stack>
          <RhfTextField
            name={`portfolioInfo[${index}].INTRO`}
            label={'프로젝트 설명'}
            size={'medium'}
            variant={'outlined'}
            multiline
            rows={4}
          />
          <Stack direction={'row'} spacing={1}>
            <RhfTextField
              name={`portfolioInfo[${index}].MEM_CNT`}
              label={'참여인원'}
              size={'medium'}
              variant={'outlined'}
            />
            <FormControl fullWidth>
              <InputLabel>역할</InputLabel>
              <Controller
                name={`portfolioInfo[${index}].role`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    multiple
                    variant="outlined"
                    value={
                      Array.isArray(value) ?
                        value.map((item) => item.ROLE_NM)
                      : []
                    }
                    onChange={(event) => {
                      const selectedValues = event.target.value;
                      const selectedObjects = selectedValues.map((name) => {
                        const role = names.find(
                          (role) => role.ROLE_NM === name,
                        );
                        return role ? role : { ROLE_NM: name };
                      });
                      onChange(selectedObjects);
                    }}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {Array.isArray(selected) &&
                          selected.map((item, idx) => (
                            <Chip
                              key={`${item.ROLE_SN}-${idx}`} // 고유한 key 생성
                              label={
                                typeof item === 'string' ? item : item.ROLE_NM
                              }
                              sx={{ p: `0 !important` }}
                            />
                          ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              ></Controller>
            </FormControl>
            <RhfTextField
              name={`portfolioInfo[${index}].CONTRIBUTION`}
              label={'기여도(%)'}
              size={'medium'}
              variant={'outlined'}
            />
          </Stack>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={['JS', 'Node.js']}
              sx={{ flexGrow: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="기술스택" />
              )}
              fullWidth
              onInputChange={(event, newValue) => {
                setStackName(newValue);
              }}
              isOptionEqualToValue={(option, value) => option === value}
            />
            <IconButton onClick={() => handleAppendStack(index)}>
              <AddIcon />
            </IconButton>
          </Stack>
          <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
            <Typography variant="lg" fontWeight={'fontWeightBold'}>
              현재 선택한 스택
            </Typography>
            <Stack flexWrap={'wrap'} direction={'row'} useFlexGap spacing={0.5}>
              {stacks[index].map((stack, sindex) => {
                if (stack.length === 0) {
                  return null;
                }
                return (
                  <Chip
                    key={`stack_${sindex}`}
                    label={stack.ST_NM}
                    size={'small'}
                    onDelete={() => handleDeleteStack(index, sindex)}
                  />
                );
              })}
            </Stack>
          </Stack>
          <Box
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '4px',
            }}
          >
            <Stack spacing={1}>
              {links[index].map((link, linkindex) => (
                <Stack
                  key={`link_${linkindex}`}
                  direction={'row'}
                  spacing={1}
                  alignItems={'center'}
                >
                  <Box>
                    <RhfTextField
                      name={`portfolioInfo[${index}].url[${linkindex}].URL`}
                      label={'URL'}
                      size={'medium'}
                      variant={'outlined'}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <RhfTextField
                      name={`portfolioInfo[${index}].url[${linkindex}].URL_INTRO`}
                      label={'URL'}
                      size={'medium'}
                      variant={'outlined'}
                    />
                  </Box>
                  <Box>
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Stack>
              ))}
            </Stack>
            <Button
              color="primary"
              variant={'outlined'}
              fullWidth
              startIcon={
                <AddIcon sx={{ color: theme.palette.text.primary }}></AddIcon>
              }
              onClick={() => handleAppendLink(index)}
            >
              추가하기
            </Button>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">서비스 상태</InputLabel>
            <Controller
              name={`portfolioInfo[${index}].SERVICE_STTS`}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={value}
                      onChange={onChange}
                      label="서비스 상태"
                    >
                      <MenuItem value={'ACTIVE'}>배포 중</MenuItem>
                      <MenuItem value={'STOP'}>중단</MenuItem>
                      <MenuItem value={'COMPLETE'}>완료</MenuItem>
                    </Select>
                  </>
                );
              }}
            ></Controller>
          </FormControl>
          <RhfTextField
            label={'성과'}
            name={`portfolioInfo[${index}].RESULT`}
            variant={'outlined'}
            size={'medium'}
            fullWidth
          />
          <PortfolioImageList
            profileEditForm={profileEditForm}
            portfolioFieldArray={portfolioFieldArray}
            index={index}
            handleRemoveImage={handleRemoveImage}
          ></PortfolioImageList>
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
            동영상 추가 ({portfolioFieldArray.fields[index].VIDEO_URL ? 1 : 0}
            /1)
          </Button>
          {/* 비디오 URL이 있을 때만 비디오 컴포넌트 표시 */}
          {portfolioFieldArray.fields[index].VIDEO_URL && (
            <Box mt={2}>
              <video
                src={portfolioFieldArray.fields[index].VIDEO_URL.URL}
                controls
                width="100%"
              ></video>
            </Box>
          )}
        </Stack>
      ))}
      <Button
        color="primary"
        variant={'outlined'}
        onClick={handleAppendPortfolio}
        startIcon={<AddIcon />}
      >
        추가하기
      </Button>
    </Stack>
  );
};

const MemoizedProfileForm = React.memo(ProfileForm);
const MemoizedCareerForm = React.memo(CareerForm);
const MemoizedSkillForm = React.memo(SkillForm);
const MemoizedInterestForm = React.memo(InterestForm);
const MemoizedLinkForm = React.memo(LinkForm);
const MemoizedPortfolioForm = React.memo(PortfolioForm);

const ProfileEditForm = ({ profileEditForm }) => {
  return (
    <Stack spacing={4}>
      <FormGroup title={'프로필'}>
        <MemoizedProfileForm profileEditForm={profileEditForm} />
      </FormGroup>
      <FormGroup title={'경력'}>
        <MemoizedCareerForm />
      </FormGroup>
      <FormGroup title={'주요 스킬'}>
        <MemoizedSkillForm />
      </FormGroup>
      <FormGroup title={'관심분야'}>
        <MemoizedInterestForm />
      </FormGroup>
      <FormGroup title={'링크'}>
        <MemoizedLinkForm />
      </FormGroup>
      <FormGroup title={'포트폴리오'}>
        <MemoizedPortfolioForm profileEditForm={profileEditForm} />
      </FormGroup>
    </Stack>
  );
};

export default ProfileEditForm;
