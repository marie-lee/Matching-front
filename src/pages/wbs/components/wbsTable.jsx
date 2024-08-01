import { TextField } from '@mui/material';

export function createMergedTable(data) {
  const table = [];

  function traverse(node, parentNames = []) {
    const currentNames = [...parentNames, node.name];

    if (!node.child || node.child.length === 0) {
      table.push(currentNames);
    } else {
      node.child.forEach((childNode) => {
        traverse(childNode, currentNames);
      });
    }
  }

  data.forEach((item) => {
    traverse(item);
  });

  return mergeTable(table);
}

function mergeTable(table) {
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

const WbsTable = ({ tableData, handleCellChange }) => {
  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#ffffff',
      }}
    >
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) =>
              cell ?
                <td
                  key={cellIndex}
                  rowSpan={cell.rowSpan}
                  style={{
                    border: '2px solid #f4f6f8',
                    wordWrap: 'break-word',
                    padding: '2px 4px',
                  }}
                >
                  <TextField
                    value={cell.value}
                    onChange={(e) =>
                      handleCellChange(rowIndex, cellIndex, e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        border: 'none',
                        padding: 0,
                        height: '100%',
                        width: '100%',
                        '& fieldset': {
                          border: 'none',
                        },
                      },
                      input: {
                        padding: 0,
                        height: '100%',
                        width: '100%',
                        textAlign: 'center',
                      },
                    }}
                  />
                </td>
              : null,
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WbsTable;
