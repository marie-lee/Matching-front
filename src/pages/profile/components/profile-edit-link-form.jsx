import { RhfTextField } from '@/components/hook-form';
import { useTheme } from '@emotion/react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

export const LinkForm = () => {
  console.log('render LinkForm');
  const { control } = useFormContext();
  const theme = useTheme();

  // 프로필 링크
  const linkFieldArray = useFieldArray({
    control,
    name: 'profile.url',
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
              name={`profile.url[${index}].URL_ADDR`}
              variant={'outlined'}
              size={'medium'}
              fullWidth
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <RhfTextField
              label={'링크 설명'}
              name={`profile.url[${index}].URL_INTRO`}
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
