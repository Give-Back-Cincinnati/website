"use client";
import { ThemeProvider } from "@mui/material/styles";
import Navigation from "@/components/Navigation";
import { Provider } from "react-redux";
import { CreateThemeHook } from "hooks";
import { store, actions } from "store";
import { createServices } from "services";
import { Footer } from "@/components/Footer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
createServices(store, actions);

import "../styles/globals.scss";
import styles from "./layout.module.scss";

// const AltGothicFont = localFont({
//   src: 'AlternateGotNo3D_Regular.ttf',
//   display: 'swap'
// })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = CreateThemeHook();
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Provider store={store}>
          <html
            lang="en"
            // className={AltGothicFont.className}
          >
            <body>
              <Navigation />
              <div className={styles.main}>{children}</div>
              <Footer />
            </body>
            <script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              async
              defer
            ></script>
          </html>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
