import { Container, Grid } from '@mui/material';
import { ReviewInputTable, ReviewInputText } from '@/pages/review/components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { postProjectRate } from '@/services/project';

const ReviewInputPage = () => {
  const location = useLocation();
  const reviewData = location.state;
  const navigate = useNavigate();
  const { userSn } = useParams();

  const [tableData, setTableData] = useState(Array(5).fill(null)); // 테이블 데이터 상태
  const [textData, setTextData] = useState(''); // 텍스트 데이터 상태

  console.log('reviewData', reviewData);
  console.log('tableData', tableData);
  console.log('textData', textData);

  const formatData = (tableData, textData) => {
    const formattedData = tableData.reduce((acc, rate, index) => {
      acc[`RATE_${index + 1}`] = rate;
      return acc;
    }, {});
    formattedData['RATE_TEXT'] = textData;
    console.log('formattedData', formattedData);
    return formattedData;
  };

  const handleSubmit = async () => {
    // 리뷰 제출
    console.log('제출');
    const payload = formatData(tableData, textData);
    const { pjtSn } = reviewData; // reviewData에서 pjtSn 추출
    try {
      const res = await postProjectRate(payload, pjtSn, userSn);
      if (res?.status === 200) {
        console.log('리뷰 제출 성공');
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={1.5} px={20} pt={3}>
        <ReviewInputTable reviewData={reviewData} setTableData={setTableData} />
        <ReviewInputText
          setTextData={setTextData}
          handleSubmit={handleSubmit}
        />
      </Grid>
    </Container>
  );
};

export default ReviewInputPage;
