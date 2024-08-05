import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TextField,
  Paper,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { memo, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  <TextField value={value} onChange={onChange} fullWidth sx={textFieldStyle} />
);

const Cell = memo(
  ({ cell, rowIndex, cellIndex, handleCellChange, members }) => {
    const handleChange = useCallback(
      (e) => handleCellChange(rowIndex, cellIndex, e.target.value),
      [rowIndex, cellIndex, handleCellChange],
    );

    if (cellIndex === 4 || cellIndex === 5) {
      // 날짜
      return (
        <TableCell key={cellIndex} rowSpan={cell.rowSpan} sx={cellStyle}>
          {renderDatePicker(cell.value, (date) =>
            handleCellChange(rowIndex, cellIndex, date),
          )}
        </TableCell>
      );
    }

    if (cellIndex === 3) {
      // 엔지니어
      return (
        <TableCell key={cellIndex} rowSpan={cell.rowSpan} sx={cellStyle}>
          {renderSelectField(cell.value, handleChange, members)}
        </TableCell>
      );
    }

    if (cellIndex === 6) {
      // 상태
      return (
        <TableCell key={cellIndex} rowSpan={cell.rowSpan} sx={cellStyle}>
          {renderSelectField(cell.value, handleChange, [
            '대기',
            '진행중',
            '완료',
          ])}
        </TableCell>
      );
    }

    // 텍스트 필드
    return (
      <TableCell key={cellIndex} rowSpan={cell.rowSpan} sx={cellStyle}>
        {renderTextField(cell.value, handleChange)}
      </TableCell>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.cell.value === nextProps.cell.value &&
      prevProps.cell.rowSpan === nextProps.cell.rowSpan &&
      prevProps.members === nextProps.members
    );
  },
);

const WbsInputTable = memo(({ tableData, handleCellChange, members }) => (
  <TableContainer
    component={Paper}
    sx={{ backgroundColor: '#ffffff', width: '70%', borderRadius: 0 }}
    elevation={0}
  >
    <Table>
      <colgroup>
        <col style={{ width: '10%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '30%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
      </colgroup>
      <TableHead>
        <TableRow>
          {[
            'Part',
            'Division',
            'Work',
            'Engineer',
            'Start Date',
            'Due Date',
            'Status',
          ].map((header) => (
            <TableCell key={header} sx={{ ...cellStyle, textAlign: 'center' }}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map(
              (cell, cellIndex) =>
                cell && (
                  <Cell
                    key={cellIndex}
                    cell={cell}
                    rowIndex={rowIndex}
                    cellIndex={cellIndex}
                    handleCellChange={handleCellChange}
                    members={members}
                  />
                ),
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
));

export default WbsInputTable;
