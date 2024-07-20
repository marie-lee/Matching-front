import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ResponsiveImg } from '@/components/img';

const PortfolioDetail = ({ open, setOpen, portfolio }) => {
  console.log('portfolio', portfolio);
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={() => setOpen(null)} maxWidth={'lg'} fullWidth>
      <DialogTitle>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          {portfolio.pfolNm}
          <IconButton onClick={() => setOpen(null)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider variant="middle" />
      <DialogContent sx={{ backgroundColor: theme.palette.background.neutral }}>
        <Stack spacing={2} p={3} bgcolor={'background.default'}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <ResponsiveImg
                src={portfolio.img}
                alt={portfolio.pfolNm}
                width={230}
                height={150}
              />
            </Grid>
            <Grid item container xs={12} md={8} sx={{ p: 2 }}>
              <Stack>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <Typography
                    color={theme.palette.text.secondary}
                    variant={'lg'}
                  >
                    기간
                  </Typography>
                  <Typography
                    variant={'sm'}
                    color={theme.palette.text.secondary}
                  >
                    {`${portfolio.startDt} ~ ${portfolio.endDt}`}
                  </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <Typography
                    color={theme.palette.text.secondary}
                    variant={'lg'}
                  >
                    인원
                  </Typography>
                  <Typography
                    variant={'sm'}
                    color={theme.palette.text.secondary}
                  >
                    {`${portfolio.startDt} ~ ${portfolio.endDt}`}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Box>
            <p>{`${portfolio.startDt} ~ ${portfolio.endDt}`}</p>
          </Box>
          <Box>
            {portfolio.stacks.map((stack, index) => (
              <span key={`${portfolio.pfolNm}_stack_${index}`}>
                {stack.stNm}
              </span>
            ))}
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioDetail;
