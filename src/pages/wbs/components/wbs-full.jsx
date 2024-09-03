// React Import
import { memo, useCallback } from 'react';

// MUI Import
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

// DatePicker Import
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
      onChange={onChange}
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
  ({ cell, rowIndex, cellIndex, handleCellChange, members, editable }) => {
    const handleChange = useCallback(
      (e) => handleCellChange(rowIndex, cellIndex, e.target.value),
      [rowIndex, cellIndex, handleCellChange],
    );

    const cellStyleWithEditable = {
      ...cellStyle,
      pointerEvents: editable ? 'none' : 'auto',
    };

    if (cellIndex === 4 || cellIndex === 5) {
      // Date
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
      // Engineer
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
      // Status
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

    // Text Field
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
  (prevProps, nextProps) =>
    prevProps.cell.value === nextProps.cell.value &&
    prevProps.cell.rowSpan === nextProps.cell.rowSpan &&
    prevProps.members === nextProps.members &&
    prevProps.editable === nextProps.editable,
);

const WbsFull = memo(({ tableData, handleCellChange, members, editable }) => (
  <TableContainer
    component={Paper}
    sx={{ width: '100%', overflowX: 'hidden', borderRadius: '0', mb: 5 }}
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
            'Start-Date',
            'Due-Date',
            'Status',
          ].map((header) => (
            <TableCell
              key={header}
              sx={{
                ...cellStyle,
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 'fontWeightSemiBold',
                height: '60px',
              }}
            >
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody sx={{ height: '100vh' }}>
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
                    editable={editable}
                  />
                ),
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
));

export default WbsFull;
