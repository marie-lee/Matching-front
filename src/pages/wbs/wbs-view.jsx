import { useState, useEffect } from 'react';
import { Button, Stack, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setTableData } from '@/store/wbsSlice';
import WbsInputTable from '@/pages/wbs/components/wbsInputTable';

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
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack mt={5}>
          <Button
            onClick={handleSave}
            color="basicButton"
            sx={{ width: '80px' }}
          >
            Edit
          </Button>
        </Stack>
        <Stack mt={5}>
          <WbsInputTable
            tableData={localTableData}
            handleCellChange={handleCellChange}
            members={members}
            width={100}
          />
        </Stack>
      </Container>
    </>
  );
};

export default WbsView;
