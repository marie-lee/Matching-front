//React Import
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Mui Import
import { Stack, Container, Box } from '@mui/material';

//Data Import
import { selectPjtSn } from '@/store/pjtsn-reducer';
import { setMemberData } from '@/store/wbsSlice';
//Component Import
import TopBar from '@/pages/wbs/components/top-bar';
import WbsFull from '@/pages/wbs/components/wbs-full';
import GanttFull from '@/pages/wbs/components/gantt-full';
import { transformWbsDataToTableFormat } from './components/wbs-utils';
import { mergeTableDataByRowSpan } from '@/pages/wbs/components/merge-table-data';

//Api Import
import { getWbs } from '@/services/wbs';
import { postEditWbs, getWbsInfo } from '@/services/wbs';

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

  useEffect(() => {
    const fetchWbsData = async () => {
      try {
        const wbsData = await getWbs(pjtSn);
        const ProjectData = await getWbsInfo(pjtSn);
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

        return updatedTable;
      });
    }
  };

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
        />
        <Stack mt={5} direction="row">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: tracking ? 10 : 6,
            }}
          >
            <WbsFull
              tableData={localTableData}
              handleCellChange={handleCellChange}
              members={memberNames}
              editable={editable}
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
              />
            </Box>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default WbsView;
