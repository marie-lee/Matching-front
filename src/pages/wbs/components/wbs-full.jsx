import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';

import CellComponent from '@/pages/wbs/components/cell';

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

        // if (cellIndex === 1) {
        //   delete newColSpanInfo[rowIndex];

        //   newRowSpanInfo[rowIndex] = {
        //     division: tableData[rowIndex]?.[cellIndex]?.rowSpan,
        //     part: partRowSpan,
        //     data: JSON.parse(
        //       JSON.stringify(tableData.slice(rowIndex + 1, rowIndex + rowSpan)),
        //     ),
        //   };
        //   const savedRowSpan = newRowSpanInfo[rowIndex]?.division || rowSpan;

        //   if (tableData[rowIndex] && tableData[rowIndex][cellIndex]) {
        //     tableData[rowIndex][cellIndex].rowSpan = savedRowSpan;
        //     newColSpanInfo[rowIndex] = 1;
        //   }
        // }
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

        // if (cellIndex === 1) {
        //   newColSpanInfo[rowIndex] = 1;

        //   const savedRowSpan = newRowSpanInfo[rowIndex]?.division || rowSpan;

        //   for (let i = rowIndex + 1; i < rowIndex + savedRowSpan; i++) {
        //     newExpandedRows.add(i);
        //   }

        //   if (tableData[rowIndex] && tableData[rowIndex][cellIndex]) {
        //     tableData[rowIndex][cellIndex].rowSpan = savedRowSpan; // Division의 rowSpan을 1로 설정\

        //     newColSpanInfo[rowIndex] = 6;
        //   }

        //   if (tableData[rowIndex] && tableData[rowIndex][0]) {
        //     tableData[rowIndex][0].rowSpan =
        //       newRowSpanInfo[rowIndex]?.part || partRowSpan;
        //   }

        //   if (newRowSpanInfo[rowIndex]?.data) {
        //     tableData.splice(
        //       rowIndex + 1,
        //       savedRowSpan - 1,
        //       ...newRowSpanInfo[rowIndex].data,
        //     );
        //   }

        //   delete newRowSpanInfo[rowIndex];
        // }
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
                    (cellIndex < 1 || !expandedRows.has(rowIndex)) && (
                      <CellComponent
                        key={cellIndex}
                        cell={cell}
                        rowIndex={rowIndex}
                        cellIndex={cellIndex}
                        handleCellChange={handleCellChange}
                        members={members}
                        editable={editable}
                        expandedRows={expandedRows}
                        toggleRowExpand={toggleRowExpand}
                        colSpanInfo={colSpanInfo}
                        tableData={tableData}
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
