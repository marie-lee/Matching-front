import { Chip, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';

export const InterestForm = () => {
  console.log('render InterestForm');
  const [interest, setInterest] = useState('');
  const { control } = useFormContext();

  // 프로필 관심사
  const interestFieldArray = useFieldArray({
    control,
    name: 'profile.interest',
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
