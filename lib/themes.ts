import { createTheme } from "@mui/material";
import { COLORS } from "../lib/constants";

// Make global app changes here
// Fonts, colors, etc.
export const appTheme = createTheme({
  palette: {
    primary: {
      light: COLORS.lightPurp,
      dark: COLORS.lightPurp,
      main: COLORS.lightPurp,
    },
    action: {
      disabledBackground: COLORS.lighterDarkPurp,
      disabled: COLORS.bgPurp,
    },
  },
  typography: {
    fontFamily: ['"Rubik"', "sans-serif"].join(","),
    h1: {
      color: COLORS.white,
      // fontSize: 28,
      fontWeight: 500,
    },
    h2: {
      color: COLORS.lightPurp,
      // fontSize: 24,
      fontWeight: 500,
    },
    h3: {
      color: COLORS.white,
      fontSize: 20,
      fontWeight: 500,
    },
    h4: {
      color: COLORS.lightPurp,
      fontSize: 20,
      fontWeight: 400,
    },
    h6: {
      color: COLORS.lightPurp,
      fontSize: 30,
      fontWeight: 500,
    },
    subtitle1: {
      color: COLORS.lightPurp,
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "21px",
      textShadow: "0px 0px 2px #000",
    },
    subtitle2: {
      color: COLORS.lightPurp,
      fontSize: 14,
      fontWeight: 400,
    },
    body1: {
      color: COLORS.lightPurp,
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      color: COLORS.lightPurp,
      fontSize: 12,
      fontWeight: 400,
    },
    caption: {
      color: COLORS.mediumPurp,
      fontSize: 60,
      fontWeight: 500,
    },
  },
  components: {
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: COLORS.darkPurp,
    //       borderRadius: "30px",
    //       margin: "10px",
    //     },
    //   },
    // },
    // MuiDrawer: {
    //   styleOverrides: {
    //     paper: {
    //       backgroundColor: COLORS.lighterDarkPurp,
    //       borderRadius: "20px",
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
