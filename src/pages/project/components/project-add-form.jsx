import { Controller, useFieldArray } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import _ from 'lodash';

import {
  RhfFormProvider,
  RhfAutocomplete,
  RhfDatePicker,
  RhfRadioGroup,
  RhfTextField,
} from '@/components/hook-form';
import {
  DURATION_UNIT_OPTIONS,
  EXPERIENCE_OPTIONS,
  PART_OPTIONS,
  SELECTED_DT_OPTIONS,
  STACK_OPTIONS,
} from '@/pages/project/constants';

// ----------------------------------------------------------------------

const Section = ({ title, children }) => (
  <Stack spacing={2} p={2} bgcolor={'background.default'} borderRadius={0.5}>
    <Typography variant={'xl'}>{title}</Typography>
    {children}
  </Stack>
);

const SelectedSection = ({ title, children }) => (
  <Stack spacing={2} p={2} bgcolor={(theme) => theme.palette.grey[200]}>
    <Typography variant={'lg'}>{title}</Typography>
    {children}
  </Stack>
);

// ----------------------------------------------------------------------

const ProjectAddForm = ({ projectAddForm, handleOpenPreview }) => {
  const theme = useTheme();

  const imgInputRef = useRef();

  // 프로젝트 참여 인원
  const rolesFieldArray = useFieldArray({
    control: projectAddForm.control,
    name: 'ROLES',
  });

  const {
    formState: { errors },
  } = projectAddForm;

  const projectAddFormValues = projectAddForm.watch();

  // 미리보기
  const onSubmit = projectAddForm.handleSubmit(() => {
    handleOpenPreview();
  });

  // 모집 분야 추가
  const handleAppendRole = () => {
    rolesFieldArray.append({
      PART: '',
      TOTAL_CNT: null,
    });
  };

  // 이미지 업로드 버튼 클릭
  const handleClickUploadButton = () => {
    if (!imgInputRef.current) {
      return;
    }

    imgInputRef.current.click();
  };

  // 이미지 업로드
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    projectAddForm.setValue('PJT_IMG', newFile, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // 이미지 업로드 취소
  const handleRemoveImage = () => {
    projectAddForm.setValue('PJT_IMG', null, { shouldValidate: false });
  };

  // ----------------------------------------------------------------------

  return (
    <RhfFormProvider form={projectAddForm} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Section title={'프로젝트 등록'}>
          {/* 이미지 */}

          {projectAddFormValues.PJT_IMG ?
            <Stack
              width={370}
              height={180}
              alignSelf={'center'}
              position={'relative'}
            >
              <img
                src={projectAddFormValues.PJT_IMG?.preview}
                alt={'프로젝트 이미지'}
                style={{ height: '100%', objectFit: 'contain' }}
              />

              <IconButton
                disableRipple
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute',
                  right: 0,
                  color: theme.palette.grey[400],
                  ':hover': {
                    color: theme.palette.grey[500],
                  },
                }}
              >
                <Icon icon={'material-symbols:cancel'} fontSize={28} />
              </IconButton>
            </Stack>
          : <Controller
              name={'PJT_IMG'}
              control={projectAddForm.control}
              render={({ field }) => (
                <Stack alignItems={'center'}>
                  <input
                    {...field}
                    hidden
                    ref={imgInputRef}
                    type={'file'}
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                  <Stack
                    width={370}
                    height={180}
                    onClick={handleClickUploadButton}
                    alignItems={'center'}
                    justifyContent={'center'}
                    backgroundColor={theme.palette.grey[300]}
                    sx={{
                      ':hover': {
                        cursor: 'pointer',
                        backgroundColor: theme.palette.grey[400],
                      },
                    }}
                  >
                    <Icon
                      icon={'material-symbols:image-outline'}
                      width={48}
                      height={48}
                      color={'white'}
                    />
                  </Stack>
                </Stack>
              )}
            />
          }

          <RhfTextField
            label={'프로젝트 제목'}
            name={'PJT_NM'}
            variant={'outlined'}
          />

          <RhfTextField
            label={'프로젝트 간단 소개'}
            name={'PJT_INTRO'}
            variant={'outlined'}
            helperText={'전체 공개용 프로젝트 소개 내용을 간단히 작성해주세요'}
          />
        </Section>

        <Section title={'프로젝트 등록자 역할'}>
          <RhfTextField
            label={'본인의 역할'}
            name={'CONSTRUCTOR_ROLE'}
            variant={'outlined'}
            helperText={'본인의 역할을 작성해주세요'}
          />
        </Section>

        <Section title={'프로젝트 모집 인원'}>
          {rolesFieldArray.fields.map((field, index) => (
            <Grid container key={field.id} columnGap={1}>
              <Grid item xs={2.5}>
                <RhfAutocomplete
                  label={'분야'}
                  size={'small'}
                  name={`ROLES[${index}].PART`}
                  options={PART_OPTIONS}
                  freeSolo
                />
              </Grid>
              <Grid item xs={2.5}>
                <RhfTextField
                  label={'인원 수'}
                  name={`ROLES[${index}].TOTAL_CNT`}
                  variant={'outlined'}
                />
              </Grid>
              <Grid item>
                <Button
                  variant={'outlined'}
                  disabled={index === 0}
                  onClick={() => rolesFieldArray.remove(index)}
                >
                  <Icon icon={'iconoir:cancel'} fontSize={28} />
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button
            variant={'outlined'}
            startIcon={<Icon icon={'ic:baseline-plus'} />}
            onClick={handleAppendRole}
          >
            추가하기
          </Button>
        </Section>

        <Section title={'예상 프로젝트 시작일'}>
          <RhfRadioGroup
            name={'SELECTED_DT_YN'}
            options={SELECTED_DT_OPTIONS}
          />
          {projectAddFormValues.SELECTED_DT_YN === 'true' && (
            <Box sx={{ width: 200 }}>
              <RhfDatePicker label={'업무 시작'} name={'START_DT'} />
            </Box>
          )}
        </Section>

        <Section title={'프로젝트 예상 기간'}>
          <Stack direction={'row'} spacing={1}>
            <Box sx={{ width: 200 }}>
              <RhfTextField
                label={'예상 기간'}
                name={'PERIOD'}
                variant={'outlined'}
              />
            </Box>
            <RhfRadioGroup
              name={'DURATION_UNIT'}
              options={DURATION_UNIT_OPTIONS}
            />
          </Stack>
        </Section>

        <Section title={'프로젝트 관련 스킬'}>
          <RhfAutocomplete
            label={'스킬'}
            name={'STACKS'}
            options={STACK_OPTIONS}
            freeSolo
            multiple
            renderTags={() => null}
          />
          <SelectedSection title={'현재 선택한 스킬'}>
            <Stack direction={'row'} flexWrap spacing={1}>
              {projectAddFormValues.STACKS.map((stack) => (
                <Chip
                  key={stack}
                  size={'small'}
                  label={stack}
                  onDelete={() => {
                    let newStacks = _.cloneDeep(projectAddFormValues.STACKS);
                    newStacks = newStacks.filter((item) => item !== stack);
                    projectAddForm.setValue('STACKS', newStacks);
                  }}
                />
              ))}
            </Stack>
          </SelectedSection>
        </Section>

        <Section title={'프로젝트 관련 경험'}>
          <RhfAutocomplete
            name={'WANTED'}
            placeholder={'원하는 경험을 입력해주세요'}
            options={EXPERIENCE_OPTIONS}
            freeSolo
            multiple
            renderTags={() => null}
          />
          <SelectedSection title={'현재 선택한 관련 경험'}>
            <Stack direction={'row'} flexWrap spacing={1}>
              {projectAddFormValues.WANTED.map((exp) => (
                <Chip
                  key={exp}
                  size={'small'}
                  label={exp}
                  onDelete={() => {
                    let newWantedList = _.cloneDeep(
                      projectAddFormValues.WANTED,
                    );
                    newWantedList = newWantedList.filter(
                      (item) => item !== exp,
                    );
                    projectAddForm.setValue('WANTED', newWantedList);
                  }}
                />
              ))}
            </Stack>
          </SelectedSection>
        </Section>

        <Section title={'프로젝트 상세 작성'}>
          <RhfTextField
            name={'PJT_DETAIL'}
            multiline={true}
            rows={10}
            variant={'outlined'}
          />

          <Stack direction={'row'} justifyContent={'flex-end'}>
            <LoadingButton type={'submit'}>미리보기</LoadingButton>
          </Stack>
        </Section>
      </Stack>
    </RhfFormProvider>
  );
};

export default ProjectAddForm;
