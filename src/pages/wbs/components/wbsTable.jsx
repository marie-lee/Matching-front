import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import { memo } from 'react';

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
  border: '2px solid #f4f6f8',
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
  },
};

const Cell = memo(({ cell, rowIndex, cellIndex, handleCellChange }) => (
  <TableCell key={cellIndex} rowSpan={cell.rowSpan} sx={cellStyle}>
    <TextField
      value={cell.value}
      onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
      fullWidth
      sx={textFieldStyle}
    />
  </TableCell>
));

const WbsTable = ({ tableData, handleCellChange }) => (
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
                  <Cell
                    key={cellIndex}
                    cell={cell}
                    rowIndex={rowIndex}
                    cellIndex={cellIndex}
                    handleCellChange={handleCellChange}
                  />
                ),
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default WbsTable;
