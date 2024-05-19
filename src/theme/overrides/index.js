import _ from 'lodash';

import { defaultProps } from '@/theme/overrides/default-props';
import { appBar } from '@/theme/overrides/appbar';
import { menu } from '@/theme/overrides/menu';

export function componentsOverrides(theme) {
  return _.merge(defaultProps(theme), appBar(), menu(theme));
}
