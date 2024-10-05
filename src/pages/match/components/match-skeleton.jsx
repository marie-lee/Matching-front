import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const MatchSkeleton = () => {
  const content = (
    <Grid item xs={12}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <InfoIcon color="action" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              선택한 멤버, 프로젝트가 없습니다
            </Typography>
            <Typography variant="body2" color="text.secondary">
              요청한 멤버 혹은 받은 프로젝트를 선택해주세요.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return <Grid container>{content}</Grid>;
};

export default MatchSkeleton;
