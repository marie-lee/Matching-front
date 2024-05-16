import _ from 'lodash';

import { defaultProps } from '@/theme/overrides/default-props';

export function componentsOverrides(theme) {
  return _.merge(defaultProps(theme));
}
