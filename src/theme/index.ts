// Main Theme Export

export { colors } from './colors';
export { typography, textStyles } from './typography';

import { colors } from './colors';
import { typography, textStyles } from './typography';

export const theme = {
  colors,
  typography,
  textStyles,
} as const;
