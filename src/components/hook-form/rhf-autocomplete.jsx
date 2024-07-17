import { Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const RhfAutocomplete = ({
  name,
  label,
  helperText,
  placeholder,
  ...other
}) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            id={`autocomplete-${name}`}
            onChange={(event, newValue) =>
              setValue(name, newValue, { shouldValidate: true })
            }
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
};

export default RhfAutocomplete;
