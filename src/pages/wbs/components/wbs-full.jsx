import React, { memo, useCallback, useEffect, useRef } from 'react';
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WbsFull = ({ tableData, handleCellChange, members, editable }) => {
  {
    /* 테이블 스타일 */
  }
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

  {
    /* 달력 */
  }
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

  {
    /* 드롭다운 */
  }
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

  {
    /* WBS 데이터 입력 */
  }
  const renderTextField = (value, onChange) => (
    <TextField
      value={value}
      onChange={onChange}
      fullWidth
      sx={textFieldStyle}
    />
  );

  {
    /* WBS Cell */
  }
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
            {renderSelectField(
              cell.value,
              !editable ? handleChange : () => {},
              ['대기', '진행중', '완료'],
            )}
          </TableCell>
        );
      }

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

  return (
    <>
      {/* WBS 헤더 */}
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          overflowX: 'hidden',
          borderRadius: '0',
        }}
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
              ].map((header, index) => (
                <TableCell
                  key={index}
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
        </Table>
      </TableContainer>
      {/* WBS 내용 */}
      <TableContainer
        component={Paper}
        sx={{ width: '100%', overflowX: 'hidden', borderRadius: '0' }}
        elevation={0}
      >
        <Table sx={{ height: '100vh' }}>
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
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
    </>
  );
};

export default WbsFull;
