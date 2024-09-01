import React, { memo, useCallback, useEffect, useState } from 'react';
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
  IconButton,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const WbsFull = ({ tableData, handleCellChange, members, editable }) => {
  const [expandedCells, setExpandedCells] = useState(new Map());

  const toggleRowExpand = (rowIndex, cellIndex) => {
    setExpandedCells((prevExpandedCells) => {
      const newExpandedCells = new Map(prevExpandedCells);
      const key = `${rowIndex}-${cellIndex}`;
      if (newExpandedCells.has(key)) {
        newExpandedCells.delete(key);
      } else {
        newExpandedCells.set(key, true);
      }
      return newExpandedCells;
    });
  };

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

      const isExpanded = expandedCells.has(`${rowIndex}-${cellIndex}`);

      if (cellIndex === 0 || cellIndex === 1) {
        return (
          <TableCell
            key={cellIndex}
            rowSpan={isExpanded ? 1 : cell.rowSpan}
            sx={cellStyleWithEditable}
          >
            <IconButton
              onClick={() => toggleRowExpand(rowIndex, cellIndex)}
              size="small"
              sx={{ padding: '0' }}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            {cell.value}
          </TableCell>
        );
      }

      if (cellIndex === 4 || cellIndex === 5) {
        return (
          <TableCell
            key={cellIndex}
            rowSpan={isExpanded ? 1 : cell.rowSpan}
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
            rowSpan={isExpanded ? 1 : cell.rowSpan}
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
            rowSpan={isExpanded ? 1 : cell.rowSpan}
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
          rowSpan={isExpanded ? 1 : cell.rowSpan}
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
                    cell &&
                    (!expandedCells.has(`${rowIndex}-${cellIndex}`) || cellIndex < 2) && (
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
