import _ from 'lodash';

import { defaultProps } from '@/theme/overrides/default-props';
import { appBar } from '@/theme/overrides/appbar';
import { button } from '@/theme/overrides/button';
import { dataGrid } from '@/theme/overrides/data-grid';
import { menu } from '@/theme/overrides/menu';

export function componentsOverrides(theme) {
  return _.merge(
    defaultProps(theme),
    appBar(),
    button(theme),
    dataGrid(theme),
    menu(theme),
  );
}
