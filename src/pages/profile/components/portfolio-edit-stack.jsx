import {
  Autocomplete,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Add 아이콘 임포트
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { stackOptions } from '../constants/stack-option';

export const PortfolioEditStack = ({ index }) => {
  const [stackName, setStackName] = useState('');
  const { control, register } = useFormContext();
  const [inputValue, setInputValue] = useState(''); // Autocomplete 입력값
  const { fields, append, remove } = useFieldArray({
    control,
    name: `portfolioInfo[${index}].stack`,
  });

  const handleAppendStack = (pindex) => {
    append({ ST_NM: stackName });
    setStackName('');
    setInputValue(''); // Autocomplete 입력값 초기화
  };

  const handleDeleteStack = (stackIndex) => {
    remove(stackIndex);
  };

  return (
    <Stack>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={stackOptions}
          sx={{ flexGrow: 1 }}
          renderInput={(params) => <TextField {...params} label="기술스택" />}
          fullWidth
          inputValue={inputValue} // Autocomplete 입력값 상태 연결
          freeSolo
          onInputChange={(event, newValue) => {
            setStackName(newValue);
            setInputValue(newValue); // 입력값 상태 업데이트
          }}
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
          {fields.map((stack, sindex) => {
            if (stack.length === 0) {
              return null;
            }
            return (
              <Chip
                key={`stack_${sindex}`}
                label={stack.ST_NM}
                size={'small'}
                onDelete={() => handleDeleteStack(sindex)}
              />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};
