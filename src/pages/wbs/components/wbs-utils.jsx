export function transformWbsDataToTableFormat(wbsData) {
  const table = [];

  function merged(node, parentNames = [], rowSpanInfo = {}) {
    const currentNames = [...parentNames, node.name];
    const currentRowSpanInfo = { ...rowSpanInfo };

    currentNames.slice(0, 3).forEach((name, index) => {
      if (currentRowSpanInfo[index]) {
        currentRowSpanInfo[index] += 1;
      } else {
        currentRowSpanInfo[index] = 1;
      }
    });

    if (node.data) {
      currentNames[3] = node.data.workerNm || '';
      currentNames[4] = node.data.startDt || '';
      currentNames[5] = node.data.endDt || '';
      currentNames[6] = node.data.status || '';
      currentNames[7] = node.ticketSn || '';
    } else if (currentNames.length === 4) {
      currentNames[3] = '';
      currentNames[4] = '';
      currentNames[5] = '';
      currentNames[6] = '';
      currentNames[7] = '';
    }

    if (node.child && node.child.length > 0) {
      node.child.forEach((childNode) => {
        merged(childNode, currentNames, currentRowSpanInfo);
      });
    } else {
      table.push(currentNames);
    }
  }

  wbsData.forEach((topLevelNode) => {
    merged(topLevelNode);
  });

  return mergeTableRows(table);
}

function mergeTableRows(table) {
  const mergedTable = [];
  const rowCount = table.length;
  const colCount = Math.max(...table.map((row) => row.length));

  for (let i = 0; i < rowCount; i++) {
    mergedTable.push(new Array(colCount).fill(''));
  }

  for (let col = 0; col < colCount; col++) {
    let lastValue = null;
    let spanStart = -1;

    for (let row = 0; row < rowCount; row++) {
      const cellValue = table[row][col] || '';

      if (cellValue && cellValue === lastValue && col < 3) {
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
