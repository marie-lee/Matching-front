import { RhfDatePicker, RhfTextField } from '@/components/hook-form';
import RhfSwitch from '@/components/hook-form/rhf-switch';
import { useTheme } from '@emotion/react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

export const CareerForm = () => {
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
        // startIcon={<AddIcon sx={{ color: theme.palette.text.primary }} />}
        startIcon={<AddIcon />}
        onClick={handleAppendCareer}
      >
        추가하기
      </Button>
    </Stack>
  );
};
