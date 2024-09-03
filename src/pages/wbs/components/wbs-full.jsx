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
  const [rowSpanInfo, setRowSpanInfo] = useState({}); // 모든 rowSpan 정보를 저장

  const toggleRowExpand = (rowIndex, cellIndex, rowSpan, partRowSpan) => {
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = new Set(prevExpandedRows);
      const newColSpanInfo = { ...colSpanInfo }; // 현재 colSpan 상태 복사
      const newRowSpanInfo = { ...rowSpanInfo }; // 현재 rowSpan 상태 복사

      if (newExpandedRows.has(rowIndex)) {
        console.log("펼침!")
        newExpandedRows.delete(rowIndex);

        if (cellIndex === 1) { // Division 열을 클릭할 때만 동작
          delete newColSpanInfo[rowIndex]; // colSpan 정보 삭제

          // 현재 rowSpan 값을 rowSpanInfo에 저장
          newRowSpanInfo[rowIndex] = { 
            division: tableData[rowIndex][cellIndex].rowSpan,
            part: partRowSpan,  // Part의 rowSpan도 저장
          };

          tableData[rowIndex][cellIndex].rowSpan = 1; // Division의 rowSpan을 1로 설정
          tableData[rowIndex][0].rowSpan = 1;  // Part의 rowSpan을 1로 설정
        }
      } else {
        console.log("접힘!")
        newExpandedRows.add(rowIndex);

        if (cellIndex === 1) { // Division 열을 클릭할 때만 동작
          newColSpanInfo[rowIndex] = 6; // colSpan을 6으로 설정
          
          // rowSpan을 저장된 값으로 복원하거나 기본 rowSpan 사용
          tableData[rowIndex][cellIndex].rowSpan = newRowSpanInfo[rowIndex]?.division || rowSpan;
          tableData[rowIndex][0].rowSpan = newRowSpanInfo[rowIndex]?.part || partRowSpan;

          delete newRowSpanInfo[rowIndex]; // 복원 후 rowSpanInfo에서 제거
        }
      }
      setColSpanInfo(newColSpanInfo);  // 상태 업데이트
      setRowSpanInfo(newRowSpanInfo);  // 상태 업데이트
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

      const colSpan = colSpanInfo[rowIndex] && cellIndex === 1 ? colSpanInfo[rowIndex] : 1; // colSpan이 있으면 적용

      // Find the Part rowSpan for this Division row
      let partRowSpan = 1;
      for (let i = rowIndex; i >= 0; i--) {
        if (tableData[i][0] && tableData[i][0].rowSpan) {
          partRowSpan = tableData[i][0].rowSpan;
          break;
        }
      }

      if (cellIndex === 0 || cellIndex === 1) {
        // Part 및 Division 열에 버튼 추가
        return (
          <TableCell
            key={cellIndex}
            rowSpan={rowSpanInfo[rowIndex]?.[cellIndex === 1 ? 'division' : 'part'] || cell.rowSpan}
            colSpan={colSpan}  // colSpan 속성 추가
            sx={cellStyleWithEditable}
          >
            <IconButton
              onClick={() => toggleRowExpand(rowIndex, cellIndex, cell.rowSpan, partRowSpan)}
              size="small"
              sx={{ padding: '0' }}
            >
              {expandedRows.has(rowIndex) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            {cell.value}
          </TableCell>
        );
      }

      if (cellIndex === 4 || cellIndex === 5) {
        // DatePicker를 사용하는 셀
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
        // SelectField를 사용하는 셀 (Engineer)
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
        // SelectField를 사용하는 셀 (Status)
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
