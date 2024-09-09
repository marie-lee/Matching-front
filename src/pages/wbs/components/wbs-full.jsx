import React, { memo, useCallback, useState } from 'react';
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
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [colSpanInfo, setColSpanInfo] = useState({});
  const [rowSpanInfo, setRowSpanInfo] = useState({});

  const toggleRowExpand = (rowIndex, cellIndex, rowSpan, partRowSpan) => {
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = new Set(prevExpandedRows);
      const newColSpanInfo = { ...colSpanInfo };
      const newRowSpanInfo = { ...rowSpanInfo };

      if (newExpandedRows.has(rowIndex)) {
        newExpandedRows.delete(rowIndex);
        console.log(
          'newExpandedRows.has(rowIndex)',
          newExpandedRows.has(rowIndex),
        );
        for (let i = rowIndex + 1; i < rowIndex + rowSpan; i++) {
          newExpandedRows.delete(i);
        }

        if (cellIndex === 0) {
          delete newColSpanInfo[rowIndex];

          newRowSpanInfo[rowIndex] = {
            part: partRowSpan,
            data: JSON.parse(
              JSON.stringify(tableData.slice(rowIndex + 1, rowIndex + rowSpan)),
            ),
          };

          const savedRowSpan = newRowSpanInfo[rowIndex]?.part || rowSpan;

          if (tableData[rowIndex] && tableData[rowIndex][cellIndex]) {
            tableData[rowIndex][cellIndex].rowSpan = savedRowSpan;
            newColSpanInfo[rowIndex] = 1;
          }
        }

        if (cellIndex === 1) {
          delete newColSpanInfo[rowIndex];

          newRowSpanInfo[rowIndex] = {
            division: tableData[rowIndex]?.[cellIndex]?.rowSpan,
            part: partRowSpan,
            data: JSON.parse(
              JSON.stringify(tableData.slice(rowIndex + 1, rowIndex + rowSpan)),
            ),
          };
          const savedRowSpan = newRowSpanInfo[rowIndex]?.division || rowSpan;

          if (tableData[rowIndex] && tableData[rowIndex][cellIndex]) {
            tableData[rowIndex][cellIndex].rowSpan = savedRowSpan;
            newColSpanInfo[rowIndex] = 1;
          }
        }
      } else {
        newExpandedRows.add(rowIndex);

        if (cellIndex === 0) {
          newColSpanInfo[rowIndex] = 7;

          const savedRowSpan = newRowSpanInfo[rowIndex]?.part || rowSpan;

          for (let i = rowIndex + 1; i < rowIndex + savedRowSpan; i++) {
            newExpandedRows.add(i);
          }

          if (tableData[rowIndex] && tableData[rowIndex][cellIndex]) {
            tableData[rowIndex][cellIndex].rowSpan = savedRowSpan;
            newColSpanInfo[rowIndex] = 7;
          }

          if (tableData[rowIndex] && tableData[rowIndex][0]) {
            tableData[rowIndex][0].rowSpan =
              newRowSpanInfo[rowIndex]?.part || partRowSpan;
          }

          if (newRowSpanInfo[rowIndex]?.data) {
            tableData.splice(
              rowIndex + 1,
              savedRowSpan - 1,
              ...newRowSpanInfo[rowIndex].data,
            );
          }

          delete newRowSpanInfo[rowIndex];
        }

        if (cellIndex === 1) {
          newColSpanInfo[rowIndex] = 1;

          const savedRowSpan = newRowSpanInfo[rowIndex]?.division || rowSpan;

          for (let i = rowIndex + 1; i < rowIndex + savedRowSpan; i++) {
            newExpandedRows.add(i);
          }

          if (tableData[rowIndex] && tableData[rowIndex][cellIndex]) {
            tableData[rowIndex][cellIndex].rowSpan = savedRowSpan; // Division의 rowSpan을 1로 설정\

            newColSpanInfo[rowIndex] = 6;
          }

          if (tableData[rowIndex] && tableData[rowIndex][0]) {
            tableData[rowIndex][0].rowSpan =
              newRowSpanInfo[rowIndex]?.part || partRowSpan;
          }

          if (newRowSpanInfo[rowIndex]?.data) {
            tableData.splice(
              rowIndex + 1,
              savedRowSpan - 1,
              ...newRowSpanInfo[rowIndex].data,
            );
          }

          delete newRowSpanInfo[rowIndex];
        }
      }

      setColSpanInfo(newColSpanInfo);
      setRowSpanInfo(newRowSpanInfo);

      return newExpandedRows;
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
  let shouldSetColSpanToZero = false;

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

      const colSpan = colSpanInfo[rowIndex] ? colSpanInfo[rowIndex] : 1;
      const colSpan0 = colSpanInfo[rowIndex] === 7 ? colSpanInfo[rowIndex] : 1;

      let colSpanAdjusted;
      if (shouldSetColSpanToZero || colSpan0 === 7) {
        colSpanAdjusted = 0;
        shouldSetColSpanToZero = true;
      } else {
        colSpanAdjusted = colSpan;
        shouldSetColSpanToZero = false;
      }

      let partRowSpan = 1;
      for (let i = rowIndex; i >= 0; i--) {
        if (tableData[i][0] && tableData[i][0].rowSpan) {
          partRowSpan = tableData[i][0].rowSpan;
          break;
        }
      }

      if (cellIndex === 0) {
        if (colSpan0 === 7) {
          shouldSetColSpanToZero = true;
        } else {
          shouldSetColSpanToZero = false;
        }
        return (
          <TableCell
            key={cellIndex}
            rowSpan={cell.rowSpan}
            colSpan={colSpan0}
            sx={cellStyleWithEditable}
          >
            <IconButton
              onClick={() =>
                toggleRowExpand(rowIndex, cellIndex, cell.rowSpan, partRowSpan)
              }
              size="small"
              sx={{ padding: '0' }}
            >
              {expandedRows.has(rowIndex) ?
                <ExpandLessIcon />
              : <ExpandMoreIcon />}
            </IconButton>
            {cell.value}
          </TableCell>
        );
      }

      if (cellIndex === 1) {
        return (
          <TableCell
            key={cellIndex}
            rowSpan={cell.rowSpan}
            colSpan={colSpanAdjusted}
            sx={{
              ...cellStyleWithEditable,
              display: colSpanAdjusted === 0 ? 'none' : 'table-cell',
            }}
          >
            <IconButton
              onClick={() =>
                toggleRowExpand(rowIndex, cellIndex, cell.rowSpan, partRowSpan)
              }
              size="small"
              sx={{ padding: '0' }}
            >
              {expandedRows.has(rowIndex) ?
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
            {renderSelectField(
              cell.value,
              !editable ? handleChange : () => {},
              ['WAIT', 'IN PROGRESS', 'CLOSE'],
            )}
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
        <Table sx={{ height: '100%' }}>
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
                    (cellIndex < 2 || !expandedRows.has(rowIndex)) && (
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
