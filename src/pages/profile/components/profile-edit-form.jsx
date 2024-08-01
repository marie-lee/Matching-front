import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import 'dayjs/locale/ko';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add'; // Add 아이콘 임포트
import ImageIcon from '@mui/icons-material/Image';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import React, { useRef, useState } from 'react';
import {
  RhfAutocomplete,
  RhfDatePicker,
  RhfFormProvider,
  RhfTextField,
} from '@/components/hook-form';
import {
  Controller,
  set,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import RhfSwitch from '@/components/hook-form/rhf-switch';
import { lime } from '@mui/material/colors';

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

const ProfileForm = () => {
  const { control } = useFormContext();

  return (
    <Stack spacing={2}>
      <Stack alignItems={'center'}>
        <Avatar alt={'프로필 이미지'} sx={{ width: 100, height: 100 }} />
      </Stack>
      <Stack>
        <RhfTextField
          name={'profile[0].USER_NM'}
          label={'프로필 이름'}
          variant={'outlined'}
          size={'medium'}
        />
      </Stack>
      <Stack>
        <RhfTextField
          name={'profile[0].PF_INTRO'}
          label={'한 줄 소개'}
          variant={'outlined'}
          helperText={'나를 표현할 수 있는 한 줄 소개를 적어주세요'}
          size={'medium'}
        />
      </Stack>
    </Stack>
  );
};

const CareerForm = () => {
  const { control } = useFormContext();
  console.log('render CareerForm');

  const theme = useTheme();
  // 프로필 커리어
  const careerFieldArray = useFieldArray({
    control,
    name: 'profile[0].carrer',
  });

  const handleAppendCareer = () => {
    careerFieldArray.append({
      CARRER_NM: '',
      ENTERING_DT: null,
      QUIT_DT: null,
    });
  };

  return (
    <Stack spacing={2}>
      {careerFieldArray.fields.map((entry, index) => (
        <Stack
          key={entry.id}
          direction={'row'}
          spacing={1}
          alignItems={'center'}
        >
          <Box sx={{ flexGrow: 1 }}>
            <RhfTextField
              name={`profile[0].carrer[${index}].CARRER_NM`}
              label={'회사명'}
              variant={'outlined'}
              size={'medium'}
            />
          </Box>
          <Box>
            <RhfDatePicker
              name={`profile[0].carrer[${index}].ENTERING_DT`}
              label={'시작일'}
              views={['year', 'month']}
              size={'medium'}
              format={'YYYY-MM'}
            />
          </Box>
          {/* 재직 중인 경우에만 종료일을 보여줌 */}
          {entry.QUIT_DT === null ?
            <Box>
              <RhfSwitch
                name={`profile[0].carrer[${index}].QUIT_DT`}
                label={'재직 중'}
                checked={true} // QUIT_DT 값이 null이면 체크 박스가 체크됨
              />
            </Box>
          : <Box>
              <RhfDatePicker
                name={`profile[0].carrer[${index}].QUIT_DT`}
                label={'종료일'}
                views={['year', 'month']}
                size={'medium'}
                format={'YYYY-MM'}
              />
            </Box>
          }
          <IconButton onClick={() => careerFieldArray.remove(index)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        color="primary"
        variant="outlined"
        startIcon={<AddIcon sx={{ color: theme.palette.text.primary }} />}
        onClick={handleAppendCareer}
      >
        추가하기
      </Button>
    </Stack>
  );
};

const SkillForm = () => {
  console.log('render SkillForm');
  const [stackName, setStackName] = useState('');
  const [level, setLevel] = useState('');
  const { control } = useFormContext();
  // 프로필 스택
  const stackFieldArray = useFieldArray({
    control,
    name: 'profile[0].stack',
  });

  const handleAppendStack = () => {
    if (stackName && level) {
      stackFieldArray.append({
        ST_NM: stackName,
        ST_LEVEL: level,
      });
      // 스택 추가 후 상태 초기화
      setStackName('');
      setLevel('');
    }
  };
  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ flexGrow: 1 }}
          options={['js', 'node.js']}
          renderInput={(params) => <TextField {...params} label="기술스택" />}
          fullWidth
          onInputChange={(event, newValue) => {
            setStackName(newValue);
          }}
          isOptionEqualToValue={(option, value) => option === value}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">난이도</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
          >
            <MenuItem value={'primary'}>상</MenuItem>
            <MenuItem value={'secondary'}>중</MenuItem>
            <MenuItem value={'secondary'}>하</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={handleAppendStack}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
        <Typography variant="lg" fontWeight={'fontWeightBold'}>
          현재 선택한 스킬과 난이도
        </Typography>
        <Typography>난이도는 상, 중, 하에 따라 색상으로 나뉘어져요</Typography>
        <Stack flexWrap={'wrap'} direction={'row'} useFlexGap spacing={0.5}>
          {stackFieldArray.fields.map(
            (stack, index) =>
              stack.ST_NM &&
              stack.ST_LEVEL && (
                <Chip
                  key={`stack_${index}`}
                  label={stack.ST_NM}
                  size={'small'}
                  color={`${stack.ST_LEVEL}`}
                  onDelete={() => stackFieldArray.remove(index)}
                />
              ),
          )}
        </Stack>
        <Stack
          flexWrap={'wrap'}
          direction={'row'}
          useFlexGap
          spacing={0.5}
        ></Stack>
      </Stack>
    </Stack>
  );
};

const InterestForm = () => {
  console.log('render InterestForm');
  const [interest, setInterest] = useState('');
  const { control } = useFormContext();

  // 프로필 관심사
  const interestFieldArray = useFieldArray({
    control,
    name: 'profile[0].interest',
  });

  const handleAppendInterest = () => {
    if (interest) {
      interestFieldArray.append({ INTEREST_NM: interest });
      setInterest('');
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <TextField
          id="outlined-helperText"
          placeholder="관심 있는 스킬, 분야, 프로젝트 주제 등 자유롭게 입력하세요"
          fullWidth
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
        <IconButton onClick={handleAppendInterest}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
        <Typography variant="lg" fontWeight={'fontWeightBold'}>
          현재 관심분야
        </Typography>
        <Stack flexWrap={'wrap'} direction={'row'} useFlexGap spacing={0.5}>
          {interestFieldArray.fields.map((interest, index) => (
            <Chip
              key={`stack_${index}`}
              label={interest.INTEREST_NM}
              size={'small'}
              onDelete={() => interestFieldArray.remove(index)}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const LinkForm = () => {
  console.log('render LinkForm');
  const { control } = useFormContext();
  const theme = useTheme();

  // 프로필 링크
  const linkFieldArray = useFieldArray({
    control,
    name: 'profile[0].url',
  });

  const handleAppendLink = () => {
    linkFieldArray.append({
      URL_ADDR: '',
      URL_INTRO: '',
    });
  };

  return (
    <Stack spacing={2}>
      <Alert severity="info" variant="standard">
        <AlertTitle>
          깃헙, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 자신을 보여줄
          수 있는 링크가 있다면 작성해주세요.
        </AlertTitle>
      </Alert>
      {linkFieldArray.fields.map((link, index) => (
        <Stack
          key={link.id}
          direction={'row'}
          spacing={1}
          alignItems={'center'}
        >
          <Box>
            <RhfTextField
              label={'URL'}
              name={`profile[0].url[${index}].URL_ADDR`}
              variant={'outlined'}
              size={'medium'}
              fullWidth
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <RhfTextField
              label={'링크 설명'}
              name={`profile[0].url[${index}].URL_INTRO`}
              variant={'outlined'}
              size={'medium'}
              fullWidth
            />
          </Box>
          <IconButton onClick={() => linkFieldArray.remove(index)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        color="primary"
        variant={'outlined'}
        startIcon={
          <AddIcon sx={{ color: theme.palette.text.primary }}></AddIcon>
        }
        onClick={handleAppendLink}
      >
        추가하기
      </Button>
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

const PortfolioForm = () => {
  console.log('render PortfolioForm');
  const theme = useTheme();
  const { control } = useFormContext();
  const [stackName, setStackName] = useState('');
  const imagefileInputRef = useRef(null);
  const videofileInputRef = useRef(null);

  // 프로필 포트폴리오
  const portfolioFieldArray = useFieldArray({
    control,
    name: 'portfolioInfo',
  });

  const handleAppendPortfolio = () => {
    portfolioFieldArray.append({
      PFOL_NM: '',
      START_DT: null,
      END_DT: null,
      INTRO: '',
      ROLE: [],
      CONTRIBUTION: '',
      MEM_CNT: '',
      stack: [],
      SERVICE_STTS: '',
      RESULT: '',
      URL: [],
      MEDIA: [],
    });
  };

  const handleAppendStack = () => {
    if (stackName) {
      portfolioFieldArray.fields.forEach((entry, index) => {
        const stack = entry.TECH_STACK;
        stack.push(stackName);
      });
      setStackName('');
    }
  };

  const handleAppendLink = (index) => {
    portfolioFieldArray.fields[index].URL.push({
      URL: '',
      DESCRIPTION: '',
    });
    portfolioFieldArray.update(index, {
      ...portfolioFieldArray.fields[index],
    });
  };

  const handleAddImageClick = () => {
    imagefileInputRef.current.click();
  };

  const handleAddVideoClick = () => {
    videofileInputRef.current.click();
  };

  const handleImageFileChange = (index) => (event) => {
    const currentImageCount =
      portfolioFieldArray.fields[index].IMAGE_URL.length;
    if (currentImageCount >= 4) {
      alert('이미지는 최대 4개까지 업로드 가능합니다.');
      return;
    }
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    portfolioFieldArray.fields[index].IMAGE_URL.push({
      URL: imageUrl,
      NAME: file.name,
    });
    portfolioFieldArray.update(index, {
      ...portfolioFieldArray.fields[index],
    });
  };

  const handleRemoveImage = (portfolioIndex, imageIndex) => {
    const updatedImages = portfolioFieldArray.fields[
      portfolioIndex
    ].IMAGE_URL.filter((_, idx) => idx !== imageIndex);
    portfolioFieldArray.update(portfolioIndex, {
      ...portfolioFieldArray.fields[portfolioIndex],
      IMAGE_URL: updatedImages,
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
            <IconButton>
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
                    value={value}
                    onChange={onChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value.ROLE_SN}
                            label={value.ROLE_NM}
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
              options={['js', 'node.js']}
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
            <IconButton onClick={handleAppendStack}>
              <AddIcon />
            </IconButton>
          </Stack>
          <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
            <Typography variant="lg" fontWeight={'fontWeightBold'}>
              현재 선택한 스택
            </Typography>
            <Stack flexWrap={'wrap'} direction={'row'} useFlexGap spacing={0.5}>
              {portfolioFieldArray.fields[index].stack.map((stack, index) => {
                if (stack.length === 0) {
                  return null;
                }
                return (
                  <Chip
                    key={`stack_${index}`}
                    label={stack.ST_NM}
                    size={'small'}
                    onDelete={() => {}}
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
              {portfolioFieldArray.fields[index].url.map((link, linkindex) => (
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
                      name={`portfolioInfo[${index}].url[${linkindex}].OS`}
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
              render={({ field: { onChange, value } }) => (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  onChange={onChange}
                >
                  <MenuItem value={'ACTIVE'}>배포 중</MenuItem>
                  <MenuItem value={'STOP'}>중단</MenuItem>
                  <MenuItem value={'COMPLETE'}>완료</MenuItem>
                </Select>
              )}
            ></Controller>
          </FormControl>
          <RhfTextField
            label={'성과'}
            name={`portfolioInfo[${index}].RESULT`}
            variant={'outlined'}
            size={'medium'}
            fullWidth
          />
          <Button
            color="primary"
            variant={'outlined'}
            onClick={handleAddImageClick}
          >
            <ImageIcon sx={{ mr: 1 }}></ImageIcon>
            이미지 추가 ({portfolioFieldArray.fields[index].IMG_SUB.length}
            /4)
          </Button>
          <input
            key={`image_${index}`}
            type="file"
            accept="image/*"
            hidden
            ref={imagefileInputRef}
            onChange={handleImageFileChange(index)}
          />
          <ImageList
            sx={{ width: '100%', height: 'auto' }}
            cols={4}
            rowHeight={'auto'}
          >
            {portfolioFieldArray.fields[index].IMG_SUB.map(
              (item, imageIndex) => (
                <ImageListItem key={`image_${index}_${imageIndex}`}>
                  <img src={item} alt={item} loading="lazy" />
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
                  {imageIndex === 0 && (
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
          </ImageList>
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

const ProfileEditForm = ({ profileData }) => {
  return (
    <Stack spacing={4}>
      <FormGroup title={'프로필'}>
        <MemoizedProfileForm />
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
        <MemoizedPortfolioForm />
      </FormGroup>
    </Stack>
  );
};

export default ProfileEditForm;
