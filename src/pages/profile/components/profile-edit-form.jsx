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
  return (
    <Stack spacing={2}>
      <Stack alignItems={'center'}>
        <Avatar alt={'프로필 이미지'} sx={{ width: 100, height: 100 }} />
      </Stack>
      <Stack>
        <RhfTextField
          name={'USER_NM'}
          label={'프로필 이름'}
          variant={'outlined'}
          size={'medium'}
        />
      </Stack>
      <Stack>
        <RhfTextField
          name={'USER_INTRO'}
          label={'한 줄 소개'}
          variant={'outlined'}
          helperText={'나를 표현할 수 있는 한 줄 소개를 적어주세요'}
          size={'medium'}
        />
      </Stack>
    </Stack>
  );
};

const CareerForm = ({ profileEditForm }) => {
  const theme = useTheme();
  // 프로필 커리어
  const careerFieldArray = useFieldArray({
    control: profileEditForm.control,
    name: 'CAREER',
  });

  const handleAppendCareer = () => {
    careerFieldArray.append({
      CAREER_NM: '',
      ENTERING_DT: null,
      QUIT_DT: null,
      IS_EMPLOYED: true,
    });
  };

  const profileAddFormValues = profileEditForm.watch();

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
              name={`CAREER[${index}].CAREER_NM`}
              label={'회사명'}
              variant={'outlined'}
              size={'medium'}
            />
          </Box>
          <Box>
            <RhfDatePicker
              name={`CAREER[${index}].ENTERING_DT`}
              label={'시작일'}
              views={['year', 'month']}
              size={'medium'}
              format={'YYYY-MM'}
            />
          </Box>
          {/* 재직 중인 경우에만 종료일을 보여줌 */}
          {profileAddFormValues['CAREER'][index].IS_EMPLOYED === true ?
            <Box>
              <RhfSwitch
                name={`CAREER[${index}].IS_EMPLOYED`}
                label={'재직 중'}
              />
            </Box>
          : <Box>
              <RhfDatePicker
                name={`CAREER[${index}].QUIT_DT`}
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
const stack = [
  { stNm: 'Node.js', level: 'primary' },
  { stNm: 'React', level: 'secondary' },
];
const SkillForm = ({ profileEditForm }) => {
  const [stackName, setStackName] = useState('');
  const [level, setLevel] = useState('');
  // 프로필 스택
  const stackFieldArray = useFieldArray({
    control: profileEditForm.control,
    name: 'STACK',
  });

  const handleAppendStack = () => {
    if (stackName && level) {
      stackFieldArray.append({
        STACK_NM: stackName,
        LEVEL: level,
      });
      // 스택 추가 후 상태 초기화
      setStackName('');
      setLevel('');
    }
  };

  const profileAddFormValues = profileEditForm.watch();

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
          {profileAddFormValues.STACK.map(
            (stack, index) =>
              stack.STACK_NM &&
              stack.LEVEL && (
                <Chip
                  key={`stack_${index}`}
                  label={stack.STACK_NM}
                  size={'small'}
                  color={`${stack.LEVEL}`}
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

const InterestForm = ({ profileEditForm }) => {
  const [interest, setInterest] = useState('');

  // 프로필 관심사
  const interestFieldArray = useFieldArray({
    control: profileEditForm.control,
    name: 'INTEREST',
  });

  const handleAppendInterest = () => {
    if (interest) {
      interestFieldArray.append({ interest });
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
              label={interest.interest}
              size={'small'}
              onDelete={() => interestFieldArray.remove(index)}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const LinkForm = ({ profileEditForm }) => {
  const theme = useTheme();

  // 프로필 링크
  const linkFieldArray = useFieldArray({
    control: profileEditForm.control,
    name: 'LINK',
  });

  const handleAppendLink = () => {
    linkFieldArray.append({
      URL: '',
      DESCRIPTION: '',
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
              name={`LINK[${index}].URL`}
              variant={'outlined'}
              size={'medium'}
              fullWidth
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <RhfTextField
              label={'링크 설명'}
              name={`LINK[${index}].DESCRIPTION`}
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ?
        theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
  };
}
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
];

const videoUrl = {
  url: 'https://assets.codepen.io/6093409/river.mp4',
};

const PortfolioForm = ({ profileEditForm }) => {
  const theme = useTheme();
  const { control } = useFormContext();
  const [stackName, setStackName] = useState('');
  const fileInputRef = useRef(null);

  // 프로필 포트폴리오
  const portfolioFieldArray = useFieldArray({
    control: profileEditForm.control,
    name: 'PORTFOLIO',
  });

  const handleAppendPortfolio = () => {
    portfolioFieldArray.append({
      PROJECT_NM: '',
      START_DT: null,
      END_DT: null,
      DESCRIPTION: '',
      ROLE: [],
      CONTRIBUTION: '',
      TECH_STACK: [],
      SERVICE_STATUS: '',
      ACHIEVEMENT: '',
      URL: [],
      VIDEO_URL: '',
      IMAGE_URL: [],
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
  const profileAddFormValues = profileEditForm.watch();

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
    fileInputRef.current.click();
  };

  const handleAddVideoClick = () => {
    fileInputRef.current.click();
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
    console.log(portfolioIndex, imageIndex);
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
            name={`PORTFOLIO[${index}].PROJECT_NM`}
            variant={'outlined'}
            size={'medium'}
          />
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <RhfDatePicker
              name={`PORTFOLIO[${index}].START_DT`}
              label={'시작일'}
              views={['year', 'month']}
              size={'medium'}
              format={'YYYY-MM'}
              sx={{ flexGrow: 1 }}
            />
            <RhfDatePicker
              name={`PORTFOLIO[${index}].END_DT`}
              label={'종료일'}
              views={['year', 'month']}
              size={'medium'}
              format={'YYYY-MM'}
              sx={{ flexGrow: 1 }}
            />
          </Stack>
          <RhfTextField
            name={`PORTFOLIO[${index}].DESCRIPTION`}
            label={'프로젝트 설명'}
            size={'medium'}
            variant={'outlined'}
            multiline
            rows={4}
          />
          <Stack direction={'row'} spacing={1}>
            <RhfTextField
              name={`PORTFOLIO[${index}].CONTRIBUTION`}
              label={'참여인원'}
              size={'medium'}
              variant={'outlined'}
            />
            <FormControl fullWidth>
              <InputLabel>역할</InputLabel>
              <Controller
                name={`PORTFOLIO[${index}].ROLE`}
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
                            key={value}
                            label={value}
                            sx={{ p: `0 !important` }}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, value, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              ></Controller>
            </FormControl>
            <RhfTextField
              name={`PORTFOLIO[${index}].CONTRIBUTION`}
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
              value={stackName}
              sx={{ flexGrow: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="기술스택" />
              )}
              fullWidth
              onInputChange={(event, newValue) => {
                setStackName(newValue);
              }}
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
              {portfolioFieldArray.fields[index].TECH_STACK.map(
                (stack, index) => {
                  if (stack.length === 0) {
                    return null;
                  }
                  return (
                    <Chip
                      key={`stack_${index}`}
                      label={stack}
                      size={'small'}
                      onDelete={() => {}}
                    />
                  );
                },
              )}
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
              {portfolioFieldArray.fields[index].URL.map((link, index) => (
                <Stack
                  key={`link_${index}`}
                  direction={'row'}
                  spacing={1}
                  alignItems={'center'}
                >
                  <Box>
                    <TextField
                      key={`link_${index}`}
                      id="outlined-helperText"
                      label="URL"
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <TextField
                      key={`link_${index}`}
                      id="outlined-helperText"
                      label="링크 설명"
                      fullWidth
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
              name={`PORTFOLIO[${index}].SERVICE_STATUS`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  onChange={onChange}
                >
                  <MenuItem value={'배포 중'}>배포 중</MenuItem>
                  <MenuItem value={'중단'}>중단</MenuItem>
                  <MenuItem value={'완료'}>완료</MenuItem>
                </Select>
              )}
            ></Controller>
          </FormControl>
          <RhfTextField
            label={'성과'}
            name={`PORTFOLIO[${index}].ACHIEVEMENT`}
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
            이미지 추가 ({portfolioFieldArray.fields[index].IMAGE_URL.length}/4)
          </Button>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleImageFileChange(index)}
          />
          <ImageList
            sx={{ width: '100%', height: 'auto' }}
            cols={4}
            rowHeight={'auto'}
          >
            {portfolioFieldArray.fields[index].IMAGE_URL.map(
              (item, imageIndex) => (
                <ImageListItem key={item.URL}>
                  <img src={item.URL} alt={item.NAME} loading="lazy" />
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
                  {index === 0 && (
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
            type="file"
            ref={fileInputRef}
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

const ProfileEditForm = ({ profileEditForm }) => {
  return (
    <RhfFormProvider form={profileEditForm}>
      <Stack spacing={4}>
        <FormGroup title={'프로필'}>
          <ProfileForm />
        </FormGroup>
        <FormGroup title={'경력'}>
          <CareerForm profileEditForm={profileEditForm} />
        </FormGroup>
        <FormGroup title={'주요 스킬'}>
          <SkillForm profileEditForm={profileEditForm} />
        </FormGroup>
        <FormGroup title={'관심분야'}>
          <InterestForm profileEditForm={profileEditForm} />
        </FormGroup>
        <FormGroup title={'링크'}>
          <LinkForm profileEditForm={profileEditForm} />
        </FormGroup>
        <FormGroup title={'포트폴리오'}>
          <PortfolioForm profileEditForm={profileEditForm} />
        </FormGroup>
      </Stack>
    </RhfFormProvider>
  );
};

export default ProfileEditForm;
