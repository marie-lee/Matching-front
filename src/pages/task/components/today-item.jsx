import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import _ from 'lodash';

import { PRIORITY_LIST } from '@/pages/task/constants';

// ----------------------------------------------------------------------

const TodayItem = ({ data, onClick }) => {
  const theme = useTheme();

  const renderStatus = () => {
    return (
      <Stack bgcolor={'#E3EAFC'} borderRadius={1} px={1} py={0.5}>
        <Typography variant={'sm'}>In progress</Typography>
      </Stack>
    );
  };

  const renderPriority = () => {
    const priorityObj = _.find(PRIORITY_LIST, { value: data?.priority });

    return (
      <Stack
        borderRadius={1}
        px={1}
        py={0.5}
        bgcolor={priorityObj.style.backgroundColor}
      >
        <Typography variant={'sm'} color={priorityObj.style.color}>
          {data?.priority}
        </Typography>
      </Stack>
    );
  };

  // ----------------------------------------------------------------------

  return (
    <Stack
      spacing={1}
      sx={{
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'background.default',
        borderRadius: 1,
        ':hover': {
          cursor: 'pointer',
          borderColor: theme.palette.primary.main,
        },
      }}
      onClick={() => onClick(data)}
    >
      <Stack spacing={0.5}>
        <Typography variant={'sm'} color={'text.secondary'}>
          {data?.ticketNum}
        </Typography>
        <Typography>{data?.title}</Typography>
      </Stack>

      {data?.priority && (
        <Stack direction={'row'} spacing={1}>
          {/*{renderStatus()}*/}
          {renderPriority()}
        </Stack>
      )}

      {data?.present ||
        (data?.dueDate && (
          <Stack
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant={'sm'}>{data?.present}</Typography>
            <Typography variant={'sm'}>
              {dayjs(data.dueDate).format('YYYY.MM.DD')}
            </Typography>
          </Stack>
        ))}
    </Stack>
  );
};

export default TodayItem;
