import React, { memo, useCallback } from 'react';
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
} from '@mui/material';
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

const calculateDaysDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInTime = end - start;
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};

const generateDateRange = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

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
      // 날짜
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
      // 엔지니어
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
      // 상태
      return (
        <TableCell
          key={cellIndex}
          rowSpan={cell.rowSpan}
          sx={cellStyleWithEditable}
        >
          {renderSelectField(cell.value, !editable ? handleChange : () => {}, [
            '대기',
            '진행중',
            '완료',
          ])}
        </TableCell>
      );
    }

    // 텍스트 필드
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
      prevProps.editable === nextProps.editable
    );
  },
);

const GanttChart = memo(
  ({ tableData, handleCellChange, members, width, editable, projectStartDate, projectEndDate }) => {
    const dateRange = generateDateRange(projectStartDate, projectEndDate);

    return (
      <Box sx={{ display: 'flex', width: '100%', height: '600px' /* 원하는 높이로 설정 */, overflowX: 'auto' }}>
        {/* WBS Table */}
        <TableContainer
          component={Paper}
          sx={{ flex: '2 1 66%', overflowX: 'auto', overflowY: 'hidden', height: '100%' }}
          elevation={0}
        >
          <Table sx={{ tableLayout: 'fixed', width: '100%', height: '100%' }}>
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '15%' }} />
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
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      ...cellStyle,
                      textAlign: 'center',
                      fontSize: '11px',
                      fontWeight: 'fontWeightSemiBold',
                    }}
                  >
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
                          editable={editable}
                        />
                      ),
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Gantt 차트 Table */}
        <TableContainer
          component={Paper}
          sx={{ flex: '1 1 34%', overflowX: 'auto', overflowY: 'hidden', height: '100%' }}
          elevation={0}
        >
          <Table sx={{ tableLayout: 'fixed', width: '100%', height: '100%' }}>
            <colgroup>
              {dateRange.map((_, index) => (
                <col key={index} style={{ width: '15px' }} />
              ))}
            </colgroup>
            <TableHead>
              <TableRow>
                {dateRange.map((date, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      ...cellStyle,
                      textAlign: 'center',
                      fontSize: '11px',
                      fontWeight: 'fontWeightSemiBold',
                      borderRight: 'none', 
                    }}
                  >
                    {date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {dateRange.map((date, dateIndex) => {
                    const taskStartDate = row[4]?.value ? new Date(row[4].value) : null;
                    const taskDueDate = row[5]?.value ? new Date(row[5].value) : null;
                    const isInRange =
                      taskStartDate && taskDueDate && date >= taskStartDate && date <= taskDueDate;

                    return (
                      <TableCell
                        key={dateIndex}
                        sx={{
                          borderRight: 'none',
                          backgroundColor: isInRange ? '#3f51b5' : 'transparent',
                          width: '15px',
                          minWidth: '15px',
                          height: '30px',
                        }}
                      ></TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  },
);

export default GanttChart;
