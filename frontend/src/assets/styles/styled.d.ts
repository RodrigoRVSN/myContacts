import { ReactNode } from 'react';
import 'styled-components';
import theme from './themes/default';

declare module 'styled-components' {
  type ThemeType = typeof theme

  export interface DefaultTheme extends ThemeType { }

}