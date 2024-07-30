import { FormControlLabel, Switch } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const RhfSwitch = ({ name, label, ...other }) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch onChange={field.onChange} checked={field.value} />}
          label={label}
        />
      )}
    />
  );
};

export default RhfSwitch;
