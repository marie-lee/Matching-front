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
import { set } from 'react-hook-form';

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

const ProfileForm = ({ onChange }) => {
  return (
    <Stack spacing={2}>
      <Stack alignItems={'center'}>
        <Avatar alt={'프로필 이미지'} sx={{ width: 100, height: 100 }} />
      </Stack>
      <Stack>
        <TextField
          name="name"
          id="outlined-helperText"
          label="이름"
          defaultValue=""
          helperText="이름을 입력해주세요"
          fullWidth
          onChange={onChange}
        />
      </Stack>
      <Stack>
        <TextField
          name="intro"
          id="outlined-helperText"
          label="한 줄 소개"
          defaultValue=""
          helperText="나를 표현할 수 있는 한 줄 소개를 적어주세요"
          fullWidth
          onChange={onChange}
        />
      </Stack>
    </Stack>
  );
};

const CareerForm = ({ onChange, onRemoveEntry }) => {
  const theme = useTheme();
  const [entryIdCounter, setEntryIdCounter] = useState(1);
  const [entries, setEntries] = useState([
    {
      id: 0,
      companyName: '',
      startDate: null,
      endDate: null,
      isEmployed: true,
    },
  ]);

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      {
        id: entryIdCounter,
        companyName: '',
        startDate: null,
        endDate: null,
        isEmployed: true,
      },
    ]);
    setEntryIdCounter(entryIdCounter + 1);
  };

  const handleDateChange = (date, id, name) => {
    onChange({
      target: {
        key: 'career',
        name: `${name}-${id}`,
        value: date,
      },
    });
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    onRemoveEntry(id);
  };

  return (
    <Stack spacing={2}>
      {entries.map((entry, index) => (
        <Stack
          key={entry.id}
          direction={'row'}
          spacing={1}
          alignItems={'center'}
        >
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              name={`companyName-${index}`}
              label="회사명"
              defaultValue={entry.companyName}
              fullWidth
              onChange={(e) =>
                onChange({
                  target: {
                    key: 'career',
                    name: `companyName-${index}`,
                    value: e.target.value,
                  },
                })
              }
            />
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <DatePicker
                name={`startDate-${index}`}
                label="시작일"
                views={['year', 'month']}
                format="YYYY-MM"
                value={entry.startDate}
                onChange={(date) =>
                  handleDateChange(date, entry.id, 'startDate')
                }
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={entry.isEmployed}
                  onChange={(event) => handleEmploymentChange(entry.id, event)}
                />
              }
              label="재직 중"
            />
          </Box>
          {!entry.isEmployed && (
            <Box>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ko"
              >
                <DatePicker
                  name={`endDate-${index}`}
                  label="종료일"
                  views={['year', 'month']}
                  format="YYYY-MM"
                  value={entry.endDate}
                  onChange={(date) =>
                    handleDateChange(date, entry.id, 'endDate')
                  }
                />
              </LocalizationProvider>
            </Box>
          )}
          <IconButton onClick={() => handleRemoveEntry(entry.id)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        color="primary"
        variant="outlined"
        startIcon={<AddIcon sx={{ color: theme.palette.text.primary }} />}
        onClick={handleAddEntry}
      >
        추가하기
      </Button>
    </Stack>
  );
};
const data = [
  { stNm: 'Node.js', level: 'primary' },
  { stNm: 'React', level: 'secondary' },
];

const SkillForm = ({ onChange }) => {
  // Step 1: Initialize state
  const [data, setData] = useState([]);
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState('');

  // Step 2: Handle input changes
  const handleSkillChange = (event, value) => setSkill(value);
  const handleLevelChange = (event) => setLevel(event.target.value);

  // Step 3: Add new skill function
  const addSkill = () => {
    if (skill && level) {
      // Check if both skill and level are selected
      const newSkill = { stNm: skill, level: level };
      setData([...data, newSkill]);

      onChange({
        target: {
          key: 'skill',
          name: 'skill',
          value: { stNm: skill, level: level },
        },
      });

      setSkill(''); // Reset skill input
      setLevel(''); // Reset level input
    }
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={['js', 'node.js']}
          sx={{ flexGrow: 1 }}
          value={skill}
          onChange={handleSkillChange}
          renderInput={(params) => <TextField {...params} label="기술스택" />}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">난이도</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            onChange={handleLevelChange}
          >
            <MenuItem value={'primary'}>상</MenuItem>
            <MenuItem value={'secondary'}>중</MenuItem>
            <MenuItem value={'secondary'}>하</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={addSkill}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
        <Typography variant="lg" fontWeight={'fontWeightBold'}>
          현재 선택한 스킬과 난이도
        </Typography>
        <Typography>난이도는 상, 중, 하에 따라 색상으로 나뉘어져요</Typography>

        <Stack flexWrap={'wrap'} direction={'row'} useFlexGap spacing={0.5}>
          {data.map((stack, index) => (
            <Chip
              key={`stack_${index}`}
              label={stack.stNm}
              size={'small'}
              color={`${stack.level}`}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const InterestForm = () => {
  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <TextField
          id="outlined-helperText"
          placeholder="관심 있는 스킬, 분야, 프로젝트 주제 등 자유롭게 입력하세요"
          fullWidth
        />
        <IconButton>
          <AddIcon />
        </IconButton>
      </Stack>
      <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
        <Typography variant="lg" fontWeight={'fontWeightBold'}>
          현재 관심분야
        </Typography>
        <Stack flexWrap={'wrap'} direction={'row'} useFlexGap spacing={0.5}>
          {data.map((stack, index) => (
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
    </Stack>
  );
};

const LinkForm = () => {
  const theme = useTheme();
  return (
    <Stack spacing={2}>
      <Alert severity="info" variant="standard">
        <AlertTitle>
          깃헙, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 자신을 보여줄
          수 있는 링크가 있다면 작성해주세요.
        </AlertTitle>
      </Alert>
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
        startIcon={
          <AddIcon sx={{ color: theme.palette.text.primary }}></AddIcon>
        }
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

const PortfolioForm = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(personName);
  };
  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '4px',
      }}
    >
      <Typography variant="lg" fontWeight={'fontWeightMedium'}>
        프로젝트1
      </Typography>
      <TextField
        id="outlined-helperText"
        label="프로젝트명"
        defaultValue=""
        fullWidth
      />
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DatePicker
            label="시작일"
            views={['year', 'month']}
            format="YYYY-MM"
            sx={{ flexGrow: 1 }}
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
          {data.map((stack, index) => (
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
  );
};

const ProfileEditForm = ({ onChange, onRemoveEntry }) => {
  const handleChange = useCallback(
    (e) => {
      const {
        target: { name, value },
      } = e;
      // Call onChange with the updated state
      onChange((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [onChange], // Correctly depend on onChange prop
  );
  const handleRemoveEntry = useCallback(
    (id) => {
      // Call onRemoveEntry with the ID to remove
      onRemoveEntry(id);
    },
    [onRemoveEntry], // Correctly depend on onRemoveEntry prop
  );
  return (
    <Stack spacing={4}>
      <FormGroup title={'프로필'}>
        <ProfileForm onChange={onChange} />
      </FormGroup>
      <FormGroup title={'경력'}>
        <CareerForm onChange={onChange} onRemoveEntry={handleRemoveEntry} />
      </FormGroup>
      <FormGroup title={'주요 스킬'}>
        <SkillForm onChange={onChange} />
      </FormGroup>
      <FormGroup title={'관심분야'}>
        <InterestForm onChange={handleChange} />
      </FormGroup>
      <FormGroup title={'링크'}>
        <LinkForm onChange={handleChange} />
      </FormGroup>
      <FormGroup title={'포트폴리오'}>
        <PortfolioForm onChange={handleChange} />
        <Button
          color="primary"
          variant={'outlined'}
          startIcon={<AddIcon></AddIcon>}
        >
          추가하기
        </Button>
      </FormGroup>
    </Stack>
  );
};

export default ProfileEditForm;
