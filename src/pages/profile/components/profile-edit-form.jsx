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
const label = { inputProps: { 'aria-label': 'Switch demo' } };
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add'; // Add 아이콘 임포트
import ImageIcon from '@mui/icons-material/Image';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import React, { useCallback, useEffect, useState } from 'react';
import {
  RhfAutocomplete,
  RhfDatePicker,
  RhfFormProvider,
  RhfTextField,
} from '@/components/hook-form';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import RhfSwitch from '@/components/hook-form/rhf-switch';

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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <RhfDatePicker
                name={`CAREER[${index}].ENTERING_DT`}
                label={'시작일'}
                views={['year', 'month']}
                size={'medium'}
                format={'YYYY-MM'}
              />
            </LocalizationProvider>
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
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ko"
              >
                <RhfDatePicker
                  name={`CAREER[${index}].QUIT_DT`}
                  label={'종료일'}
                  views={['year', 'month']}
                  size={'medium'}
                  format={'YYYY-MM'}
                />
              </LocalizationProvider>
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
const data = [
  { stNm: 'Node.js', level: 'primary' },
  { stNm: 'React', level: 'secondary' },
];

const level = 'primary';
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

const InterestForm = ({ onChange, onRemoveEntry }) => {
  const [interests, setInterests] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddInterest = () => {
    if (inputValue.trim() !== '') {
      setInterests([...interests, { stNm: inputValue, level: 'primary' }]);
      onChange({
        target: {
          key: 'interest',
          name: 'interest',
          value: { itNm: inputValue, level: 'primary' },
        },
      });
      setInputValue('');
    }
  };

  const handleDeleteInterest = (index) => {
    const newInterests = interests.filter((_, i) => i !== index);
    setInterests(newInterests);
    onRemoveEntry(index, 'interest');
  };
  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <TextField
          id="outlined-helperText"
          placeholder="관심 있는 스킬, 분야, 프로젝트 주제 등 자유롭게 입력하세요"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
        />
        <IconButton onClick={handleAddInterest}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
        <Typography variant="lg" fontWeight={'fontWeightBold'}>
          현재 관심분야
        </Typography>
        <Stack flexWrap={'wrap'} direction={'row'} useFlexGap spacing={0.5}>
          {interests.map((stack, index) => (
            <Chip
              key={`stack_${index}`}
              label={stack.stNm}
              size={'small'}
              color={`${stack.level}`}
              onDelete={() => handleDeleteInterest(index)}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const LinkForm = ({ onChange, onRemoveEntry }) => {
  const theme = useTheme();
  const [links, setLinks] = useState([]);
  const [entryIdCounter, setEntryIdCounter] = useState(0);

  const addLink = () => {
    setLinks([...links, { id: entryIdCounter, url: '', description: '' }]);
    setEntryIdCounter(entryIdCounter + 1);
  };

  const removeLink = (linkId) => {
    setLinks(links.filter((link) => link.id !== linkId));
    onRemoveEntry(linkId, 'link');
  };

  const handleChange = (e) => {
    const {
      target: { id, value },
    } = e;
    const [key, linkId] = id.split('-');
    const newLinks = links.map((link) => {
      if (link.id.toString() === linkId) {
        return { ...link, [key]: value };
      }
      return link;
    });
    setLinks(newLinks);
    onChange({
      target: {
        key: 'link',
        name: 'link',
        value: newLinks.find((link) => link.id.toString() === linkId),
      },
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
      {links.map((link) => (
        <Stack
          key={link.id}
          direction={'row'}
          spacing={1}
          alignItems={'center'}
        >
          <Box>
            <TextField
              id={`url-${link.id}`}
              label="URL"
              defaultValue={link.url}
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              id={`description-${link.id}`}
              label="링크 설명"
              defaultValue={link.description}
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <IconButton onClick={() => removeLink(link.id)}>
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
        onClick={addLink}
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

const PortfolioForm = ({ onChange, onRemoveEntry }) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [entries, setEntries] = useState([]);
  const [entryIdCounter, setEntryIdCounter] = useState(0);
  const [personName, setPersonName] = useState([]);

  const handleAddEntry = () => {
    setEntries([...entries, { id: entryIdCounter }]); // Add a new entry with a unique id
    onChange({
      target: {
        key: 'portfolio',
        name: 'id',
        value: entryIdCounter,
      },
    });
    setEntryIdCounter(entryIdCounter + 1); // Increment the entry id counter
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    onRemoveEntry(id, 'portfolio');
  };

  const handleChange = (event) => {
    const { key, name, value } = event.target;
    console.log(key, name, value);
    onChange({
      target: {
        key: 'portfolio',
        name: name,
        id: entryIdCounter,
        value: value,
      },
    });
  };

  const renderEntries = () => {
    return entries.map((entry, index) => (
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
          <IconButton onClick={() => handleRemoveEntry(entry.id)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          id={`project-name-${entry.id}`}
          label="프로젝트명"
          defaultValue=""
          fullWidth
          onChange={(e) => {
            handleChange({
              target: {
                key: 'portfolio',
                name: 'title',
                value: e.target.value,
              },
            });
          }}
        />
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <DatePicker
              label="시작일"
              views={['year', 'month']}
              format="YYYY-MM"
              sx={{ flexGrow: 1 }}
              onChange={(date) =>
                handleChange({
                  target: {
                    key: 'portfolio',
                    name: 'startDate',
                    value: date,
                  },
                })
              }
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <DatePicker
              label="종료일"
              views={['year', 'month']}
              format="YYYY-MM"
              sx={{ flexGrow: 1 }}
            />
          </LocalizationProvider>
        </Stack>
        <TextField
          id="outlined-multiline-static"
          label="프로젝트 설명"
          multiline
          rows={4}
        />
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <TextField id="outlined-helperText" label="참여인원" fullWidth />
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">역할</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField id="outlined-helperText" label="기여도(%)" fullWidth />
        </Stack>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['js', 'node.js']}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => <TextField {...params} label="기술스택" />}
            fullWidth
          />
          <IconButton>
            <AddIcon />
          </IconButton>
        </Stack>
        <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
          <Typography variant="lg" fontWeight={'fontWeightBold'}>
            현재 선택한 스택
          </Typography>
          <Stack flexWrap={'wrap'} direction={'row'} useFlexGap spacing={0.5}>
            {stack.map((stack, index) => (
              <Chip
                key={`stack_${index}`}
                label={stack.stNm}
                size={'small'}
                color={`${stack.level}`}
                onDelete={() => {}}
              />
            ))}
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
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Box>
              <TextField
                id="outlined-helperText"
                label="URL"
                defaultValue=""
                fullWidth
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                id="outlined-helperText"
                label="링크 설명"
                defaultValue=""
                fullWidth
              />
            </Box>
            <Box>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Box>
          </Stack>
          <Button
            color="primary"
            variant={'outlined'}
            fullWidth
            sx={{ mt: 2 }}
            startIcon={
              <AddIcon sx={{ color: theme.palette.text.primary }}></AddIcon>
            }
          >
            추가하기
          </Button>
        </Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">서비스 상태</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            <MenuItem value={'상'}>배포 중</MenuItem>
            <MenuItem value={'중'}>중단</MenuItem>
            <MenuItem value={'하'}>완료</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-helperText"
          label="성과"
          defaultValue=""
          fullWidth
        />
        <Button color="primary" variant={'outlined'}>
          <ImageIcon sx={{ mr: 1 }}></ImageIcon>
          이미지 추가 (2/4)
        </Button>
        <ImageList
          sx={{ width: '100%', height: 'auto' }}
          cols={4}
          rowHeight={'auto'}
        >
          {itemData.map((item, index) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <IconButton
                onClick={() => handleRemoveImage(item.img)}
                sx={{ position: 'absolute', top: 0, right: 0, color: 'white' }}
              >
                <CloseIcon />
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
          ))}
        </ImageList>
        <Button color="primary" variant={'outlined'}>
          <PersonalVideoIcon sx={{ mr: 1 }}></PersonalVideoIcon>
          동영상 추가 (1/1)
        </Button>
        {/* 비디오 URL이 있을 때만 비디오 컴포넌트 표시 */}
        {videoUrl && (
          <Box mt={2}>
            {/* 상단 버튼에서 마진을 주어 간격 조정 */}
            <video src={videoUrl.url} controls width="100%"></video>
          </Box>
        )}
      </Stack>
    ));
  };

  return (
    <Stack spacing={2}>
      {renderEntries()}
      <Button
        color="primary"
        variant={'outlined'}
        startIcon={<AddIcon />}
        onClick={handleAddEntry}
      >
        추가하기
      </Button>
    </Stack>
  );
};

const ProfileEditForm = ({ profileEditForm }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Assuming you want to collect the form data
    const data = {
      USER_NM: formData.get('USER_NM'),
      USER_INTRO: formData.get('USER_INTRO'),
    };
    console.log(data);
  };

  return (
    <RhfFormProvider form={profileEditForm} onSubmit={onSubmit}>
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
          <InterestForm />
        </FormGroup>
        <FormGroup title={'링크'}>
          <LinkForm />
        </FormGroup>
        <FormGroup title={'포트폴리오'}>
          <PortfolioForm />
        </FormGroup>
      </Stack>
    </RhfFormProvider>
  );
};

export default ProfileEditForm;
