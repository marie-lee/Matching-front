import { Controller, useFormContext } from 'react-hook-form';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const RhfDatePicker = ({
  name,
  label,
  helperText,
  format = 'YYYY-MM-DD',
  size,
  views,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ko'}>
          <DatePicker
            {...field}
            label={label}
            format={format}
            views={views || ['year', 'month', 'day']}
            value={value ? dayjs(value) : null}
            onChange={(date) => {
              onChange(date ? date.format(format) : null);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: size || 'small',
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
