import { ThemeProvider } from '@emotion/react';
import useThemeStore from '~/lib/stores/useThemeStore';
import { GlobalStyle } from './GlobalStyle';

interface Props {
  children: React.ReactNode;
}

const MyThemeProvider = ({ children }: Props) => {
  // const { theme } = useThemeStore();
  return (
    // <ThemeProvider theme={theme}>
    //TODO: 이거 localStorage에서 { {"state":{"theme":"lightTheme"},"version":0} }에서 theme를 가져와야함

    <ThemeProvider theme={{}}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default MyThemeProvider;
