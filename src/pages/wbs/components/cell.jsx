import { memo, useCallback, useState } from 'react';
import {
  TableCell,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CellComponent = memo(
  ({
    cell,
    rowIndex,
    cellIndex,
    handleCellChange,
    members,
    editable,
    expandedRows,
    toggleRowExpand,
    colSpanInfo,
    tableData,
  }) => {
    const [shouldSetColSpanToZero, setShouldSetColSpanToZero] = useState(false);

    const cellStyle = {
      border: '1px solid #000',
      padding: '2px 4px',
    };

    const textFieldStyle = {
      '& .MuiOutlinedInput-root': {
        border: 'none',
        padding: 0,
        height: '100%',
        width: '100%',
        '& fieldset': { border: 'none' },
      },
      input: {
        padding: 0,
        height: '100%',
        width: '100%',
        textAlign: 'center',
        fontSize: '12px',
      },
    };

    const renderDatePicker = (value, onChange) => (
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={onChange}
        customInput={
          <TextField
            fullWidth
            sx={textFieldStyle}
            inputProps={{ style: { fontSize: '12px' } }}
          />
        }
        dateFormat="yyyy-MM-dd"
      />
    );

    const renderSelectField = (value, onChange, options) => (
      <FormControl fullWidth variant="outlined">
        <Select
          value={value || ''}
          onChange={(e) => {
            onChange(e);
          }}
          sx={{
            '& .MuiSelect-select': {
              padding: '0 !important',
              fontSize: '12px',
              textAlign: 'center',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiSelect-icon': {
              display: 'none',
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 100,
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );

    const renderTextField = (value, onChange) => (
      <TextField
        value={value}
        onChange={onChange}
        fullWidth
        sx={textFieldStyle}
      />
    );

    const handleChange = useCallback(
      (e) => handleCellChange(rowIndex, cellIndex, e.target.value),
      [rowIndex, cellIndex, handleCellChange],
    );

    const cellStyleWithEditable = {
      ...cellStyle,
      pointerEvents: editable ? 'none' : 'auto',
    };

    const colSpan0 = colSpanInfo[rowIndex] === 7 ? colSpanInfo[rowIndex] : 1;

    if (!shouldSetColSpanToZero && colSpan0 === 7) {
      setShouldSetColSpanToZero(true);
    }

    let partRowSpan = 1;
    for (let i = rowIndex; i >= 0; i--) {
      if (tableData[i][0] && tableData[i][0].rowSpan) {
        partRowSpan = tableData[i][0].rowSpan;
        break;
      }
    }

    if (cellIndex === 0) {
      const isRowExpanded = expandedRows.has(rowIndex);

      const totalColumns = shouldSetColSpanToZero ? 7 : 1;

      return (
        <TableCell
          key={cellIndex}
          rowSpan={cell.rowSpan}
          colSpan={totalColumns} // 확장 여부에 따라 colSpan 설정
          sx={{
            ...cellStyle, // cellStyle만 사용하고, IconButton의 pointerEvents에는 영향 주지 않음
          }}
        >
          <IconButton
            onClick={() => {
              toggleRowExpand(rowIndex, cellIndex, cell.rowSpan, partRowSpan);
              setShouldSetColSpanToZero(!shouldSetColSpanToZero); // 버튼 클릭 시 상태 변경
            }}
            size="small"
            sx={{ padding: '0' }}
          >
            {shouldSetColSpanToZero ?
              <ExpandLessIcon />
            : <ExpandMoreIcon />}
          </IconButton>
          {cell.value}
        </TableCell>
      );
    }

    if (cellIndex === 4 || cellIndex === 5) {
      return (
        <TableCell
          key={cellIndex}
          rowSpan={cell.rowSpan}
          sx={cellStyleWithEditable}
        >
          {renderDatePicker(cell.value, (date) =>
            !editable ? handleCellChange(rowIndex, cellIndex, date) : null,
          )}
        </TableCell>
      );
    }

    if (cellIndex === 3) {
      return (
        <TableCell
          key={cellIndex}
          rowSpan={cell.rowSpan}
          sx={cellStyleWithEditable}
        >
          {renderSelectField(
            cell.value,
            !editable ? handleChange : () => {},
            members,
          )}
        </TableCell>
      );
    }

    if (cellIndex === 6) {
      return (
        <TableCell
          key={cellIndex}
          rowSpan={cell.rowSpan}
          sx={cellStyleWithEditable}
        >
          {renderSelectField(cell.value, !editable ? handleChange : () => {}, [
            'WAIT',
            'IN PROGRESS',
            'CLOSE',
          ])}
        </TableCell>
      );
    }

    // 기본 TextField를 사용하는 셀
    return (
      <TableCell
        key={cellIndex}
        rowSpan={cell.rowSpan}
        sx={cellStyleWithEditable}
      >
        {renderTextField(cell.value, !editable ? handleChange : () => {})}
      </TableCell>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.cell.value === nextProps.cell.value &&
      prevProps.cell.rowSpan === nextProps.cell.rowSpan &&
      prevProps.members === nextProps.members &&
      prevProps.editable === nextProps.editable &&
      prevProps.rowIndex === nextProps.rowIndex &&
      prevProps.cellIndex === nextProps.cellIndex
    );
  },
);

export default CellComponent;
