import { FormControlLabel, Switch } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const RhfSwitch = ({ name, label, onChange, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Switch
              {...field}
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                if (onChange) {
                  onChange(e);
                }
              }}
            />
          }
          label={label}
        />
      )}
    />
  );
};

export default RhfSwitch;
