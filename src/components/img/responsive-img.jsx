import { Box } from '@mui/material';

const ResponsiveImg = ({ src, alt, height, width }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 0,
        paddingTop: `calc(${height} / ${width} * 100%)`,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default ResponsiveImg;
