import { Controller, useFormContext } from 'react-hook-form';
import { MenuItem, TextField } from '@mui/material';
import _ from 'lodash';

const RhfSelect = ({
  name,
  helperText,
  displayEmpty = false,
  displayEmptyText = '전체',
  options,
  //
  selectedOptions,
  selectedOptionsKey,
  ...other
}) => {
  const { control } = useFormContext();

  const getDisabledMenuItem = (currentItem) => {
    let disabled = false;

    if (_.isArray(selectedOptions) && selectedOptions.length > 1) {
      const index = _.findIndex(selectedOptions, {
        [selectedOptionsKey]: currentItem.value,
      });

      if (index === -1) {
        disabled = false;
      } else {
        disabled = true;
      }
    }

    return disabled;
  };

  // ----------------------------------------------------------------------

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error ? error?.message : helperText}
          select
          SelectProps={{
            displayEmpty: displayEmpty,
            notched: displayEmpty ? true : undefined, // 빈 값을 허용하지 않을 경우, Select 박스의 Label 정상적으로 노출되기 위함
          }}
          InputLabelProps={{
            shrink: displayEmpty ? true : undefined, // 빈 값을 허용하지 않을 경우, Select 박스의 Label 정상적으로 노출되기 위함
          }}
          {...other}
        >
          {/* 값을 선택하지 않은 경우 */}
          {displayEmpty && <MenuItem value={''}>{displayEmptyText}</MenuItem>}
          {/* 선택 목록 */}
          {options?.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={getDisabledMenuItem(option)}
            >
              {option.text}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default RhfSelect;
