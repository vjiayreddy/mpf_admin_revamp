// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";
import { APP_ROUTES } from "src/configs/routes";

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
      title: "Role Management",
      icon: "mdi:shield-outline",
      path: APP_ROUTES.ROLE_MANAGEMENT,
    },
  ];
};

export default navigation;
