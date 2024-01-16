// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Dashboards",
      icon: "mdi:home-outline",
      badgeContent: "new",
      badgeColor: "error",
      children: [
        {
          title: "Analytics",
          path: "/dashboards/analytics",
        },
      ],
    },
    {
      sectionTitle: "Modules",
    },
    {
      title: "Users",
      icon: "mdi:account-outline",
      children: [
        {
          title: "All Users",
          path: "/apps/user/list",
        },
      ],
    },
    {
      title: "Roles",
      icon: "mdi:shield-outline",
      children: [
        {
          title: "Roles",
          path: "/apps/roles",
        },
        {
          title: "Permissions",
          path: "/apps/permissions",
        },
      ],
    },
  ];
};

export default navigation;
