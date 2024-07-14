import { Controller, useFormContext } from 'react-hook-form';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const RhfDatePicker = ({ name, label, helperText, format = 'YYYY-MM-DD' }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ko'}>
          <DatePicker
            {...field}
            label={label}
            format={format}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
                error: !!error,
                helperText: error ? error?.message : helperText,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default RhfDatePicker;