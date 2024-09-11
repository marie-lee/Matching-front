import { RhfTextField } from '@/components/hook-form';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';

export const PortfolioLink = ({ index }) => {
  const theme = useTheme();
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `portfolioInfo[${index}].url`,
  });

  const handleAppendLink = () => {
    append({ URL: '', URL_INTRO: '' });
  };

  const handleRemovePortfolioLink = () => {
    // 필드 값을 초기화하고 삭제
    remove(fields.length - 1);
  };

  useEffect(() => {
    fields.forEach((field, fieldIndex) => {
      register(`portfolioInfo[${index}].url[${fieldIndex}].URL`);
      register(`portfolioInfo[${index}].url[${fieldIndex}].URL_INTRO`);
    });
  }, [fields, index, register]);

  return (
    <Box
      sx={{
        position: 'relative',
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '4px',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: '-10px',
          left: '10px',
          backgroundColor: 'background.default',
          padding: '0 4px',
        }}
      >
        URL
      </Typography>
      <Stack>
        {fields.map((field, linkIndex) => (
          <Stack
            key={field.id}
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            pb={1}
          >
            <Box>
              <RhfTextField
                name={`portfolioInfo[${index}].url[${linkIndex}].URL`}
                label={'URL'}
                size={'medium'}
                variant={'outlined'}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <RhfTextField
                name={`portfolioInfo[${index}].url[${linkIndex}].URL_INTRO`}
                label={'설명'}
                size={'medium'}
                variant={'outlined'}
              />
            </Box>
            <Box>
              <IconButton onClick={() => handleRemovePortfolioLink()}>
                <CloseIcon />
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
        onClick={handleAppendLink}
      >
        추가하기
      </Button>
    </Box>
  );
};
