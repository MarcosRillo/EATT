"use client";
import * as React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "@/theme";
import createEmotionCache from "@/createEmotionCache"; // Ruta al archivo de caché de Emotion (Paso 3)
import Head from "next/head";
import { EventsProvider } from "@/app/context/EventContext";

const inter = Inter({ subsets: ["latin"] });

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <body className={inter.className}>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <EventsProvider>{children}</EventsProvider>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
