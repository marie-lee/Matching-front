/* eslint-disable react/jsx-key */

import {
  Grid,
  Autocomplete,
  TextField,
  Box,
  Typography,
  Fab,
} from '@mui/material';
import Chip from '@mui/material/Chip';
const HEADER_HEIGHT = 96; // 헤더 + 마진높이

const RecommendPage = () => {
  return (
    <Grid
      item
      xs={12}
      md={12}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      }}
    >
      <Grid
        container
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: 'white',
          marginRight: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box
          my={1}
          display="flex"
          alignItems="center"
          sx={{
            border: '2px solid #D1D1D1',
            borderRadius: 3,
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: 1 / 2.7,
            padding: 1,
          }}
        >
          <Typography
            variant={'xl'}
            fontWeight={'fontWeightSemiBold'}
            sx={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            프로젝트 이름
          </Typography>
          <Typography variant={'base'} fontWeight={'fontWeightMedium'} mt={1}>
            프로젝트 이름 세계 모든 종류의 빵을 설명하는 사이트로 이렇게 길게 쓸
            수 있고, 최대 2줄 까지 작성 가능 할듯
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            height="100%"
            mt={2}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <Typography variant="base" fontWeight="fontWeightBold">
                프로젝트 정보
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography
                  variant="sm"
                  fontWeight="fontWeightMedium"
                  sx={{ mt: 1.5 }}
                >
                  기간
                </Typography>
                <Typography
                  variant="sm"
                  fontWeight="fontWeightBold"
                  sx={{ mt: 1.5, ml: 2 }}
                >
                  2021-02-16
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                <Typography
                  variant="sm"
                  fontWeight="fontWeightMedium"
                  sx={{ mt: 2 }}
                >
                  스택
                </Typography>
                {Array.from({ length: 3 }).map((index) => (
                  <Typography
                    key={index}
                    fontWeight="fontWeightMedium"
                    variant="sm"
                    sx={{
                      ml: 1,
                      mt: 2,
                      border: '0px solid',
                      borderRadius: 10,
                      pl: 1,
                      pr: 1,
                      backgroundColor: 'lightgreen',
                    }}
                  >
                    Node.js
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <Typography variant="base" fontWeight="fontWeightBold">
                모집 정보
              </Typography>
              <Typography
                variant="sm"
                fontWeight="fontWeightMedium"
                sx={{ mt: 1.5 }}
              >
                모집 인원
              </Typography>
              <Typography
                variant="sm"
                fontWeight="fontWeightMedium"
                sx={{ mt: 3 }}
              >
                남은 인원
              </Typography>
            </Box>
          </Box>
        </Box>
        <Autocomplete
          multiple
          id="tags-filled"
          options={top100Films.map((option) => option.title)}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="조건을 추가해 주세요."
              placeholder="Options"
            />
          )}
          fullWidth
        />
        <Box
          my={2}
          display="flex"
          alignItems="center"
          sx={{
            border: '2px solid grey',
            width: '100%',
            flexGrow: 3,
            height: 1 / 3,
            overflowY: 'auto',
          }}
        ></Box>
      </Grid>

      <Grid
        container
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box
          my={1}
          display="flex"
          alignItems="center"
          sx={{
            border: '2px solid #D1D1D1',
            borderRadius: 3,
            width: '100%',
            height: 1 / 2.5,
          }}
        >
          프로필
        </Box>
        <Box
          my={2}
          display="flex"
          alignItems="center"
          sx={{
            border: '2px solid grey',
            width: '100%',
            flexGrow: 3,
          }}
        ></Box>
      </Grid>
    </Grid>
  );
};

export default RecommendPage;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
];
