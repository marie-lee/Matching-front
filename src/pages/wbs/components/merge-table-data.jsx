export function mergeTableDataByRowSpan(tableData, memberData) {
  const result = [];
  let i = 0;

  while (i < tableData.length) {
    const currentRow = tableData[i];
    const firstValue = currentRow[0]?.value || '';

    const primaryGroup = {
      name: firstValue,
      child: [],
    };

    let j = 0;
    while (j < (currentRow[0]?.rowSpan || 1)) {
      const subRow = tableData[i + j];
      const secondValue = subRow[1]?.value || '';

      const secondaryGroup = {
        name: secondValue,
        child: [],
      };

      let k = 0;
      while (k < (subRow[1]?.rowSpan || 1)) {
        const innerRow = tableData[i + j + k];
        const thirdValue = innerRow[2]?.value || '';

        // worker 이름을 userSn으로 매핑
        const workerName = innerRow[3]?.value || '';
        const workerData = memberData.find(
          (member) => member.userNm === workerName,
        );
        const workerSn = workerData ? workerData.userSn : null;

        const startDt =
          innerRow[4]?.value && !isNaN(new Date(innerRow[4].value).getTime()) ?
            innerRow[4].value
          : null;
        const endDt =
          innerRow[5]?.value && !isNaN(new Date(innerRow[5].value).getTime()) ?
            innerRow[5].value
          : null;

        const tertiaryGroup = {
          name: thirdValue,
          data: {
            worker: workerSn !== null ? workerSn : null,
            startDt: startDt || null,
            endDt: endDt || null,
            status: innerRow[6]?.value || '',
          },
        };

        secondaryGroup.child.push(tertiaryGroup);
        k += innerRow[2]?.rowSpan || 1;
      }

      primaryGroup.child.push(secondaryGroup);
      j += subRow[1]?.rowSpan || 1;
    }

    result.push(primaryGroup);
    i += currentRow[0]?.rowSpan || 1;
  }

  return result;
}
