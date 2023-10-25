import { createTheme, Theme } from "@mui/material/styles";

const headerFont = [
  "AlternateGotNo3D",
  "SF UI Text",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Helvetica",
  "Arial",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
].join(",");

export const CreateThemeHook: () => Theme = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#d03236",
      },
      secondary: {
        main: "#333333",
      },
    },
    typography: {
      fontFamily: [
        "SF UI Text",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
      ].join(","),
      h1: {
        fontFamily: headerFont,
      },
      h2: {
        fontFamily: headerFont,
      },
      h3: {
        fontFamily: headerFont,
      },
      h4: {
        fontFamily: headerFont,
      },
      h5: {
        fontFamily: headerFont,
      },
      h6: {
        fontFamily: headerFont,
      },
    },
  });
};

export default CreateThemeHook;
