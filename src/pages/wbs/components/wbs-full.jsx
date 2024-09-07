/* eslint-disable react-hooks/rules-of-hooks */
// React Import
import { memo, useCallback, useState, useEffect } from 'react';

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
  Box,
  IconButton,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  ({
    cell,
    rowIndex,
    cellIndex,
    handleCellChange,
    members,
    editable,
    row,
    cost,
    setCost,
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      setIsExpanded((prev) => !prev);

      // console.log('row', row);
      // console.log('cell.rowSpan', cell.rowSpan);
      // console.log('cellIndex', cellIndex);
      // console.log('cell', cell.ticketSn);
      // console.log('rowIndex', rowIndex);
      // console.log('cost', cost[0]);

      const targetArrayIndex = cost[0].findIndex(
        (innerRow) => innerRow[cellIndex]?.ticketSn === cell.ticketSn,
      );

      if (targetArrayIndex !== -1) {
        const rowSpan = cell.rowSpan || 1;

        const updatedCost = [...cost[0]];

        updatedCost.splice(targetArrayIndex, rowSpan);

        cost[0] = updatedCost;

        handleCellChange(rowIndex, cellIndex, cell.value, cost[0]);
      }
    };

    const handleChange = useCallback(
      (e) => handleCellChange(rowIndex, cellIndex, e.target.value),
      [rowIndex, cellIndex, handleCellChange],
    );

    const cellStyleWithEditable = {
      ...cellStyle,
      pointerEvents: editable ? 'none' : 'auto',
    };

    if (cellIndex === 0 || cellIndex === 1) {
      // text
      return (
        <TableCell
          key={cellIndex}
          rowSpan={cell.rowSpan}
          sx={cellStyleWithEditable}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            {/* TextField */}
            {renderTextField(cell.value, (e) =>
              !editable ?
                handleCellChange(rowIndex, cellIndex, e.target.value, cost[0])
              : null,
            )}

            <IconButton
              sx={{ padding: 0, minWidth: 'auto' }}
              onClick={toggleExpand}
            >
              {isExpanded ?
                <ExpandLessIcon sx={{ marginLeft: '4px' }} />
              : <ExpandMoreIcon sx={{ marginLeft: '4px' }} />}
            </IconButton>
          </Box>
        </TableCell>
      );
    }
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

const WbsFull = memo(({ tableData, handleCellChange, members, editable }) => {
  return (
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
          {tableData.map((row, rowIndex) => {
            const cost = useState(tableData);
            return (
              <TableRow key={rowIndex}>
                {row.map(
                  (cell, cellIndex) =>
                    cell && (
                      <Cell
                        key={cellIndex}
                        cellIndex={cellIndex}
                        cell={cell}
                        rowIndex={rowIndex}
                        handleCellChange={handleCellChange}
                        members={members}
                        editable={editable}
                        row={row}
                        cost={cost}
                      />
                    ),
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default WbsFull;
