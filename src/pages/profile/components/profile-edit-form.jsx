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
import PortfolioVideo from './portfolio-edit-video';
import { PortfolioLink } from './portfolio-edit-link';
import { PortfolioEditStack } from './portfolio-edit-stack';

const FormGroup = React.forwardRef(({ title, children }, ref) => (
  <Stack p={2} spacing={2} bgcolor={'background.default'} ref={ref}>
    <Typography component={'p'} variant={'xl'} fontWeight={'fontWeightMedium'}>
      {title}
    </Typography>
    {children}
  </Stack>
));

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

const names = [
  '백엔드',
  '프론트엔드',
  '기획',
  '디자인',
  '개발',
  '검증',
  '솔루션',
];

const PortfolioForm = ({ profileEditForm }) => {
  console.log('render PortfolioForm');
  const { control, setValue } = useFormContext();

  // 프로필 포트폴리오
  const portfolioFieldArray = useFieldArray({
    control,
    name: 'portfolioInfo',
  });

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
      IMG: [],
      VIDEO: '',
    });
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

  const handleRemovePortfolio = (index) => {
    portfolioFieldArray.remove(index);
  };

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
          <PortfolioEditStack index={index}></PortfolioEditStack>
          <PortfolioLink index={index}></PortfolioLink>
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
          <PortfolioVideo
            index={index}
            portfolioFieldArray={portfolioFieldArray}
            profileEditForm={profileEditForm}
          ></PortfolioVideo>
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

const ProfileEditForm = ({ profileEditForm, refs }) => {
  return (
    <Stack spacing={4}>
      <FormGroup title={'프로필'} ref={refs.profileRef}>
        <MemoizedProfileForm profileEditForm={profileEditForm} />
      </FormGroup>
      <FormGroup title={'경력'} ref={refs.careerRef}>
        <MemoizedCareerForm />
      </FormGroup>
      <FormGroup title={'주요 스킬'} ref={refs.skillRef}>
        <MemoizedSkillForm />
      </FormGroup>
      <FormGroup title={'관심분야'} ref={refs.interestRef}>
        <MemoizedInterestForm />
      </FormGroup>
      <FormGroup title={'링크'} ref={refs.linkRef}>
        <MemoizedLinkForm />
      </FormGroup>
      <FormGroup title={'포트폴리오'} ref={refs.portfolioRef}>
        <MemoizedPortfolioForm profileEditForm={profileEditForm} />
      </FormGroup>
    </Stack>
  );
};

export default ProfileEditForm;
