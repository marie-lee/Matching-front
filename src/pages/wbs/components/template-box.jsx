import {
  Box,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  Chip,
  Avatar,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const circle = (
  <Avatar
    sx={{
      width: 20,
      height: 20,
      bgcolor: '#BDBDBD',
      color: 'white',
      fontSize: '12px',
    }}
  >
    OP
  </Avatar>
);

const TemplateBox = ({ item, selectedBox, handleBoxClick }) => {
  return (
    <Box
      key={item.id}
      height={230}
      width={350}
      display="flex"
      flexDirection="column"
      p={2}
      pb={1}
      mr={3}
      sx={{
        border:
          selectedBox === item.id ? '2px solid #3498db' : '1px solid lightgrey',
        borderRadius: '1px',
        cursor: 'pointer',
      }}
      onClick={() => handleBoxClick(item.id)}
    >
      <Typography
        color={'basicButton.main'}
        variant="sm"
        sx={{ fontWeight: 500 }}
      >
        {item.title}
      </Typography>
      <Typography variant="lg" mt={1} sx={{ fontWeight: 600 }}>
        {item.desc}
      </Typography>
      <Stack ml={1}>
        <List>
          {item.in.map((inItem, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemIcon sx={{ minWidth: 'auto' }}>
                <FiberManualRecordIcon sx={{ fontSize: 5 }} />
              </ListItemIcon>
              <Typography color={'text.secondary'} ml={1}>
                {inItem}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ marginTop: 'auto' }}>
        {item.chip.map((chip, idx) => (
          <Chip key={idx} avatar={circle} label={chip} size="small" />
        ))}
      </Stack>
    </Box>
  );
};

export default TemplateBox;
