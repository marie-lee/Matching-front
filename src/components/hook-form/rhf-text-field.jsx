import { Controller, useFormContext } from 'react-hook-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Icon } from '@iconify/react';

import { useBoolean } from '@/hooks/use-boolean';

// ----------------------------------------------------------------------
/**
 * react hook form 내부에서 사용 가능한 TextField
 *
 * @param {string} name
 * @param {string} helperText 도움말 또는 에러메시지
 * @param {string} type 'password'로 지정할 경우, 입력값 숨기기/보기 토글 가능
 * @param other
 */
const RhfTextField = ({ name, helperText, type = 'text', ...other }) => {
  const { control } = useFormContext();

  const password = useBoolean();

  // ----------------------------------------------------------------------

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            fullWidth
            variant="standard"
            size={'small'}
            type={
              type === 'password' ?
                password.value ?
                  'text'
                : 'password'
              : type
            }
            value={field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            InputProps={{
              endAdornment: type === 'password' && (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Icon
                      icon={
                        password.value ? 'solar:eye-bold' : (
                          'solar:eye-closed-bold'
                        )
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...other}
          />
        );
      }}
    />
  );
};

export default RhfTextField;
