/* eslint-disable react-refresh/only-export-components */
//React Import
import { memo } from 'react';

//Mui Import
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

export function createMergedTable(data) {
  const table = [];

  function merged(node, parentNames = []) {
    const currentNames = [...parentNames, node.name];
    if (!node.child || node.child.length === 0) {
      table.push(currentNames);
    } else {
      node.child.forEach((childNode) => {
        merged(childNode, currentNames);
      });
    }
  }

  data.forEach((item) => {
    merged(item);
  });

  return createTable(table);
}

function createTable(table) {
  const mergedTable = [];
  const rowCount = table.length;
  const colCount = Math.max(...table.map((row) => row.length));

  for (let i = 0; i < rowCount; i++) {
    mergedTable.push(new Array(colCount).fill(null));
  }

  for (let col = 0; col < colCount; col++) {
    let lastValue = null;
    let spanStart = -1;
    for (let row = 0; row < rowCount; row++) {
      const cellValue = table[row][col] || '';

      if (cellValue === lastValue) {
        mergedTable[spanStart][col].rowSpan += 1;
        mergedTable[row][col] = null;
      } else {
        mergedTable[row][col] = { value: cellValue, rowSpan: 1 };
        lastValue = cellValue;
        spanStart = row;
      }
    }
  }

  return mergedTable;
}

const cellStyle = {
  border: '5px solid #f5f5f5',
  padding: '5px 4px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const Cell = memo(({ cell, cellIndex }) => (
  <TableCell key={cellIndex} rowSpan={cell.rowSpan} sx={cellStyle}>
    {cell.value}
  </TableCell>
));

const WbsTable = ({ tableData }) => (
  <TableContainer sx={{ backgroundColor: '#ffffff', borderRadius: 0 }}>
    <Table>
      <colgroup>
        <col style={{ width: '20%' }} />
        <col style={{ width: '30%' }} />
        <col style={{ width: '50%' }} />
      </colgroup>
      <TableBody>
        {tableData.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map(
              (cell, cellIndex) =>
                cell && (
                  <Cell key={cellIndex} cell={cell} cellIndex={cellIndex} />
                ),
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default WbsTable;
