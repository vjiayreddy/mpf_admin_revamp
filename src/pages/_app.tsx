import { ReactNode } from "react";
import Head from "next/head";
import { Router } from "next/router";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import NProgress from "nprogress";
import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../apollo/apolloClient";
import { defaultACLObj } from "src/configs/acl";
import themeConfig from "src/configs/themeConfig";
import { SessionProvider } from "next-auth/react";
import "src/@fake-db";
import { Toaster } from "react-hot-toast";
import UserLayout from "src/layouts/UserLayout";
import ThemeComponent from "src/@core/theme/ThemeComponent";
import AuthGuard from "src/@core/components/auth/AuthGuard";
import GuestGuard from "src/@core/components/auth/GuestGuard";
import Spinner from "src/@core/components/spinner";

import { AuthProvider } from "src/context/AuthContext";
import {
  SettingsConsumer,
  SettingsProvider,
} from "src/@core/context/settingsContext";

// ** Styled Components
import ReactHotToast from "src/@core/styles/libs/react-hot-toast";

// ** Utils Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

// ** Prismjs Styles
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

import "src/iconify-bundle/icons-bundle-react";

// ** Global css styles
import "../../styles/globals.css";

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
  session: any;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    session,
  } = props;

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ));

  const setConfig = Component.setConfig ?? undefined;

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName}`}</title>
          <meta name="description" content={`${themeConfig.templateName}`} />
          <meta name="keywords" content="mpf admin" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ApolloProvider client={apolloClient}>
                  <ThemeComponent settings={settings}>
                    <AuthGuard fallback={<Spinner />}>
                      {getLayout(<Component {...pageProps} />)}
                    </AuthGuard>
                    <ReactHotToast>
                      <Toaster
                        position={settings.toastPosition}
                        toastOptions={{ className: "react-hot-toast" }}
                      />
                    </ReactHotToast>
                  </ThemeComponent>
                </ApolloProvider>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default App;
