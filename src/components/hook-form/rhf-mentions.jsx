import { Controller, useFormContext } from 'react-hook-form';

import { CustomMentionsTextField } from '@/components/custom-mentions';

// ----------------------------------------------------------------------

const RhfMentions = ({ name, helperText, data, containerRef, ...other }) => {
  const { control } = useFormContext();

  // ----------------------------------------------------------------------

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <CustomMentionsTextField
            {...field}
            fullWidth
            variant="standard"
            error={!!error}
            helperText={error ? error?.message : helperText}
            data={data}
            containerRef={containerRef}
            {...other}
          />
        );
      }}
    />
  );
};

export default RhfMentions;
