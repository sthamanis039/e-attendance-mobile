import {createTheme} from '@rneui/themed';
import COLORS from '../constants/colors';

const theme = createTheme({
  lightColors: {
    primary: COLORS.primary[500],
    secondary: COLORS.secondary[500],
    tertiary: COLORS.tertiary[500],
    primaryShades: COLORS.primary,
    secondaryShades: COLORS.secondary,
    tertiaryShades: COLORS.tertiary,
    gray: COLORS.gray,
    // different for light colors
    background: 'white',
  },
  darkColors: {
    primary: COLORS.primary[500],
    secondary: COLORS.secondary[500],
    tertiary: COLORS.tertiary[500],
    primaryShades: COLORS.primary,
    secondaryShades: COLORS.secondary,
    tertiaryShades: COLORS.tertiary,
    gray: COLORS.gray,
    // different for dark colors
    background: COLORS.dark[500],
  },
  components: {
    Input: (props, th) => ({
      containerStyle: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRadius: 10,
        borderColor: th.colors.primary,
        paddingTop: 18,
      },
      inputContainerStyle: {
        borderBottomWidth: 0,
      },
      labelStyle: {
        position: 'absolute',
        color: th.colors.primary,
        left: 16,
        fontSize: 14,
        paddingVertical: 4,
        fontWeight: 'regular',
      },
      ...(props?.errorMessage
        ? {errorStyle: {}}
        : {errorStyle: {display: 'none'}}),
    }),
    Button: (props, th) => ({
      buttonStyle: {
        borderRadius: 8,
        paddingVertical: 12,
      },
    }),
    SearchBar: (props, th) => ({
      containerStyle: {
        borderRadius: 8,
        backgroundColor: th.colors.background,
        borderTopWidth: 0,
        borderBottomWidth: 0,
      },
      inputContainerStyle: {
        backgroundColor: th.colors.background,
      },
    }),
  },
});

export default theme;
