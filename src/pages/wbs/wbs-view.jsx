/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Stack, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setMemberData, setTableData } from '@/store/wbsSlice';
import WbsInputTable from '@/pages/wbs/components/wbs-input-table';
import TopBar from '@/pages/wbs/components/top-bar';
import { selectPjtSn } from '@/store/pjtsn-reducer';
import { getWbs, getWbsInfo } from '@/services/wbs';
import { transformWbsDataToTableFormat } from './components/wbs-utils';
import { mergeTableDataByRowSpan } from '@/pages/wbs/components/merge-table-data';
import { postEditWbs } from '@/services/wbs';
import { transformWbsDataWithTicketSn } from './components/ticket-sn';
const WbsView = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.wbs.tableData);
  const pjtData = useSelector((state) => state.wbs.pjtData);
  const memberDatas = useSelector((state) => state.wbs.memberData);
  const pjtSn = useSelector(selectPjtSn);

  const [localTableData, setLocalTableData] = useState([]);
  const [save, setSave] = useState(true);
  const [view, setView] = useState(true);
  const [tracking, setTracking] = useState(true);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    const fetchWbsData = async () => {
      try {
        const res = await getWbsInfo(pjtSn);
        const res1 = await getWbs(pjtSn);
        console.log('res1', res1.data);
        const ticketSnBasedData = transformWbsDataWithTicketSn(
          res1.data.wbsData,
        );
        //console.log('ticketSnBasedData', ticketSnBasedData);
        const transformedData = transformWbsDataToTableFormat(
          res1.data.wbsData,
        );
        console.log('transformedData', transformedData);

        const memberData = res.data.members.map((member, index) => ({
          userSn: member.userSn,
          userNm: member.userNm || '',
          part: member.part || '',
          role: member.role || '',
        }));

        dispatch(setTableData(transformedData));
        dispatch(setMemberData(memberData));
        setLocalTableData(transformedData);
      } catch (error) {
        console.error('Error fetching WBS data:', error);
      }
    };

    fetchWbsData();
  }, [pjtSn, dispatch]);

  const handleCellChange = (rowIndex, cellIndex, newValue) => {
    if (editable) return;
    setLocalTableData((prevData) => {
      const updatedTable = [...prevData];
      updatedTable[rowIndex] = [...updatedTable[rowIndex]];
      updatedTable[rowIndex][cellIndex] = {
        ...updatedTable[rowIndex][cellIndex],
        value: newValue,
      };

      return updatedTable;
    });
  };

  const handleSave = async () => {
    setSave((prev) => !prev);

    try {
      const updatedTableData = tableData.map((row) => [...row]);

      const wbsData = mergeTableDataByRowSpan(updatedTableData, memberDatas);

      const finalData = {
        pjtData,
        memberData: memberDatas,
        wbsData,
      };

      console.log('Final Data:', JSON.stringify(finalData, null, 2));
      // const res2 = await postEditWbs(pjtSn, finalData);
      // console.log('res', res2);
    } catch (error) {
      console.error('Error posting:', error.message || error);

      console.error('Full error details:', error);
    }
  };

  const handleClick = () => {
    setSave((prev) => !prev);
    setEditable((prev) => !prev);
  };

  const handleCancel = () => {
    setSave((prev) => !prev);
    setEditable((prev) => !prev);
  };

  const handleView = () => {
    setView((prev) => !prev);
  };

  const handleTracking = () => {
    setTracking((prev) => !prev);
  };

  return (
    <>
      <Container maxWidth="xl">
        <TopBar
          save={save}
          handleClick={handleClick}
          handleSave={handleSave}
          handleCancel={handleCancel}
          view={view}
          handleView={handleView}
          handleTracking={handleTracking}
          tracking={tracking}
        />
        <Stack mt={5}>
          <WbsInputTable
            tableData={localTableData}
            handleCellChange={handleCellChange}
            isFullWidth={tracking ? 60 : 100}
            editable={editable}
            members={memberDatas}
            projectStartDate={pjtData.startDt}
            projectEndDate={pjtData.endDt}
          />
        </Stack>
      </Container>
    </>
  );
};

export default WbsView;
