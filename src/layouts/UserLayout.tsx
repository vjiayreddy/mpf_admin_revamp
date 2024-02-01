// ** React Imports
import { ReactNode } from "react";

// ** MUI Imports
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Layout Imports
// !Do not remove this Layout import
import Layout from "src/@core/layouts/Layout";

// ** Navigation Imports
import VerticalNavItems from "src/navigation/vertical";
import HorizontalNavItems from "src/navigation/horizontal";

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from "./components/vertical/AppBarContent";
import HorizontalAppBarContent from "./components/horizontal/AppBarContent";

// ** Hook Import
import { useSettings } from "src/@core/hooks/useSettings";

interface Props {
  children: ReactNode;
  contentHeightFixed?: boolean;
}

const UserLayout = ({ children, contentHeightFixed }: Props) => {
  const { settings, saveSettings } = useSettings();
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  if (hidden && settings.layout === "horizontal") {
    settings.layout = "vertical";
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems(),
        },
        appBar: {
          content: (props) => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          ),
        },
      }}
      {...(settings.layout === "horizontal" && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems(),
          },
          appBar: {
            content: () => (
              <HorizontalAppBarContent
                settings={settings}
                saveSettings={saveSettings}
              />
            ),
          },
        },
      })}
    >
      {children}
    </Layout>
  );
};

export default UserLayout;
