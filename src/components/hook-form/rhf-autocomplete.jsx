import { Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const RhfAutocomplete = ({
  name,
  label,
  helperText,
  placeholder,
  duplicationKeyName,
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
            onChange={(event, newValue) => {
              if (field?.multiple && duplicationKeyName) {
                const value = newValue.reduce((acc, current) => {
                  const exists = acc.some(
                    (item) =>
                      item[duplicationKeyName] === current[duplicationKeyName],
                  );

                  if (!exists) {
                    acc.push(current);
                  }

                  return acc;
                }, []);

                setValue(name, value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              } else {
                setValue(name, newValue, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
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
