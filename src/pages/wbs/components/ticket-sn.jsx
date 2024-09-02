export function transformWbsDataWithTicketSn(wbsData) {
  const result = [];

  function traverseNode(node, parentTicketSn = null) {
    const { name, ticketSn, data } = node;
    const workerNm = data?.workerNm || '';
    const startDt = data?.startDt || '';
    const endDt = data?.endDt || '';
    const status = data?.status || '';

    const nodeInfo = {
      ticketSn: ticketSn || parentTicketSn,
      name,
      workerNm,
      startDt,
      endDt,
      status,
    };

    result.push(nodeInfo);

    // 자식 노드가 있는 경우 재귀 호출
    if (node.child && node.child.length > 0) {
      node.child.forEach((childNode) => traverseNode(childNode, ticketSn));
    }
  }

  // 최상위 노드부터 시작하여 모든 노드를 순회
  wbsData.forEach((topLevelNode) => {
    traverseNode(topLevelNode);
  });

  return result;
}
