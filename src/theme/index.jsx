import _ from 'lodash';
import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';

import { typography } from '@/theme/typography';
import { componentsOverrides } from '@/theme/overrides';
import { customShadows } from '@/theme/custom-shadow';
import { palette } from '@/theme/palette';
import { shadows } from '@/theme/shadow';

// ----------------------------------------------------------------------

const ThemeProvider = ({ children }) => {
  const options = {
    palette: palette,
    typography: typography,
    shadows: shadows(),
    customShadows: customShadows(),
  };

  let theme = createTheme(options);

  theme.components = _.merge(componentsOverrides(theme));

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
