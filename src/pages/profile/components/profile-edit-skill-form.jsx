import {
  Autocomplete,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { stackOptions } from '../constants/stack-option';

//색상 매핑
const levelColorMapping = {
  HIGH: 'primary',
  MEDIUM: 'secondary',
  LOW: 'default',
};

export const SkillForm = () => {
  console.log('render SkillForm');
  const [stackName, setStackName] = useState('');
  const [inputValue, setInputValue] = useState(''); // Autocomplete 입력값
  const [level, setLevel] = useState('');
  const { control } = useFormContext();
  // 프로필 스택
  const stackFieldArray = useFieldArray({
    control,
    name: 'profile.stack',
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
      setInputValue(''); // Autocomplete 입력값 초기화
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ flexGrow: 1 }}
          options={stackOptions}
          renderInput={(params) => <TextField {...params} label="기술스택" />}
          fullWidth
          freeSolo
          inputValue={inputValue} // Autocomplete 입력값 상태 연결
          onInputChange={(event, newValue) => {
            setStackName(newValue);
            setInputValue(newValue); // 입력값 상태 업데이트
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
            <MenuItem value={'HIGH'}>상</MenuItem>
            <MenuItem value={'MEDIUM'}>중</MenuItem>
            <MenuItem value={'LOW'}>하</MenuItem>
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
                  color={levelColorMapping[stack.ST_LEVEL]}
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
