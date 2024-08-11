import { useState, useEffect } from 'react';
import { Stack, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setTableData } from '@/store/wbsSlice';
import WbsInputTable from '@/pages/wbs/components/wbs-input-table';
import TopBar from '@/pages/wbs/components/top-bar';

const members = [
  '김영호',
  '박미영',
  '한민규',
  '이세진',
  '임동현',
  '백예나',
  '박지민',
  '이영현',
];

const WbsView = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.wbs.tableData);
  const [localTableData, setLocalTableData] = useState([]);
  const [save, setSave] = useState(true);
  const [view, setView] = useState(true);
  const [tracking, setTracking] = useState(true);

  useEffect(() => {
    const modifiedData = tableData.map((row) => [...row]);
    setLocalTableData(modifiedData);
  }, [tableData]);

  const handleCellChange = (rowIndex, cellIndex, newValue) => {
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

  const handleSave = () => {
    dispatch(setTableData(localTableData));
    setSave(false);
  };

  const handleClick = () => {
    setSave((prev) => !prev);
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
          view={view}
          handleView={handleView}
          handleTracking={handleTracking}
          tracking={tracking}
        />
        <Stack mt={5}>
          <WbsInputTable
            tableData={localTableData}
            handleCellChange={handleCellChange}
            members={members}
            width={tracking ? 100 : 60}
          />
        </Stack>
      </Container>
    </>
  );
};

export default WbsView;
