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

export const SkillForm = () => {
  console.log('render SkillForm');
  const [stackName, setStackName] = useState('');
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
