export function transformWbsDataToTableFormat(wbsData) {
  const table = [];

  function merged(node, parentNames = [], rowSpanInfo = {}) {
    const currentNames = [...parentNames];
    const currentRowSpanInfo = { ...rowSpanInfo };

    // 현재 노드의 이름을 추가하고, ticketSn을 메타데이터로 추가
    currentNames.push({
      value: node.name,
      ticketSn: node.ticketSn || null,
    });

    currentNames.slice(0, 3).forEach((name, index) => {
      if (currentRowSpanInfo[index]) {
        currentRowSpanInfo[index] += 1;
      } else {
        currentRowSpanInfo[index] = 1;
      }
    });

    // 노드에 데이터가 있을 경우
    if (node.data) {
      currentNames.push({
        value: node.data.workerNm || '',
        ticketSn: null,
      });
      currentNames.push({
        value: node.data.startDt || '',
        ticketSn: null,
      });
      currentNames.push({
        value: node.data.endDt || '',
        ticketSn: null,
      });
      currentNames.push({
        value: node.data.status || '',
        ticketSn: null,
      });
    } else if (currentNames.length === 4) {
      currentNames.push(...Array(4).fill({ value: '', ticketSn: null }));
    }

    // 자식 노드가 있는 경우
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
    mergedTable.push(new Array(colCount).fill(null));
  }

  for (let col = 0; col < colCount; col++) {
    let lastValue = null;
    let spanStart = -1;

    for (let row = 0; row < rowCount; row++) {
      const cell = table[row][col] || { value: '', ticketSn: null };
      const cellValue = cell.value || '';

      if (cellValue && lastValue && cellValue === lastValue.value && col < 3) {
        // 동일한 값을 가진 셀들을 병합합니다
        mergedTable[spanStart][col].rowSpan += 1;
        mergedTable[row][col] = null;
      } else {
        mergedTable[row][col] = { ...cell, rowSpan: 1 };
        lastValue = cell;
        spanStart = row;
      }
    }
  }

  return mergedTable;
}
