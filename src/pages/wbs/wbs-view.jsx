/* eslint-disable no-unused-vars */
//React Import
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Mui Import
import { Stack, Container, Box } from '@mui/material';

//Data Import
import { selectPjtSn } from '@/store/pjtsn-reducer';
import { setMemberData } from '@/store/wbsSlice';
import { issue } from './components/constants';
//Component Import
import TopBar from '@/pages/wbs/components/top-bar';
import WbsFull from '@/pages/wbs/components/wbs-full';
import GanttFull from '@/pages/wbs/components/gantt-full';
import { transformWbsDataToTableFormat } from './components/wbs-utils';
import { mergeTableDataByRowSpan } from '@/pages/wbs/components/merge-table-data';

//Api Import
import {
  getWbs,
  getWbsIssueTracking,
  postEditWbs,
  getWbsInfo,
} from '@/services/wbs';

const WbsView = () => {
  const dispatch = useDispatch();
  const pjtData = useSelector((state) => state.wbs.pjtData);
  const memberDatas = useSelector((state) => state.wbs.memberData);
  const pjtSn = useSelector(selectPjtSn);

  const memberNames = memberDatas.map((member) => member.userNm);
  const ProjectStartDate = new Date(pjtData.startDt);
  const ProjectEndDate = new Date(pjtData.endDt);

  const [localTableData, setLocalTableData] = useState([]);
  const [save, setSave] = useState(true);
  const [view, setView] = useState(true);
  const [tracking, setTracking] = useState(true);
  const [editable, setEditable] = useState(true);

  const [reload, setReload] = useState(false);

  const foldResult = renderTable(localTableData);

  const ticketDetails = issue.flatMap((item) =>
    item.TICKETS.map((ticket) => ({
      ticketSn: ticket.TICKET_SN,
      day: ticket.CREATED_DT,
    })),
  );

  useEffect(() => {
    const fetchWbsData = async () => {
      try {
        const wbsData = await getWbs(pjtSn);
        const ProjectData = await getWbsInfo(pjtSn);
        const tracking = await getWbsIssueTracking(pjtSn);
        console.log('tracking', tracking);
        dispatch(setMemberData(ProjectData.data.members));

        const transformedData = transformWbsDataToTableFormat(
          wbsData.data.wbsData,
        );

        setLocalTableData(transformedData);
      } catch (error) {
        console.error('Error fetching WBS data:', error);
      }
    };

    fetchWbsData();
  }, [pjtSn, reload, dispatch]);

  const updatedTableData = localTableData.map((row) => [...row]);

  const wbsDatas = mergeTableDataByRowSpan(updatedTableData, memberDatas);

  const handleCellChange = (rowIndex, cellIndex, newValue) => {
    if (editable) return;
    else {
      setLocalTableData((prevData) => {
        const updatedTable = [...prevData];
        updatedTable[rowIndex] = [...updatedTable[rowIndex]];

        updatedTable[rowIndex][cellIndex] = {
          ...updatedTable[rowIndex][cellIndex],
          value: newValue,
        };
        console.log('asd');

        return updatedTable;
      });
    }
  };

  function renderTable(data) {
    const foldInfo = data.map((row, rowIndex) => {
      const foldFirstColumn =
        row[0] !== null &&
        rowIndex < data.length - 1 &&
        data[rowIndex + 1][0] === null;

      const foldSecondColumn =
        row[1] !== null &&
        rowIndex < data.length - 1 &&
        data[rowIndex + 1][1] === null;

      return {
        foldFirstColumn,
        foldSecondColumn,
      };
    });

    return foldInfo;
  }

  const handleSave = async () => {
    setSave((prev) => !prev);
    setEditable((prev) => !prev);

    try {
      const finalData = {
        pjtData,
        memberData: memberDatas,
        wbsData: wbsDatas,
      };

      console.log('Final Data:', JSON.stringify(finalData, null, 2));
      const editData = await postEditWbs(pjtSn, finalData);

      setReload((prev) => !prev);
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
    setReload((prev) => !prev);
  };

  //이슈트레킹 로직 추가 해야함
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
          view={view}
          handleView={handleView}
          handleTracking={handleTracking}
          tracking={tracking}
          handleCancel={handleCancel}
        />
        <Stack mt={5} direction="row">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: tracking ? 6 : 4,
            }}
          >
            <WbsFull
              tableData={localTableData}
              handleCellChange={handleCellChange}
              members={memberNames}
              editable={editable}
              foldResult={foldResult}
            />
          </Box>
          {tracking && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'auto',
                flex: 3,
              }}
            >
              <GanttFull
                tableData={localTableData}
                projectStartDate={ProjectStartDate}
                projectEndDate={ProjectEndDate}
                ticketDetails={ticketDetails}
              />
            </Box>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default WbsView;
