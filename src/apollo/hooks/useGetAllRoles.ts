import { useEffect, useState } from "react";
import { GQL_GET_ALL_ROLES } from "./../queries/roleManagement";
import { NetworkStatus, useLazyQuery } from "@apollo/client";
import { ROLES_MODULE_API_ACTIVITIES } from "src/configs/api-activites";

export type roleType = {
  id: string;
  label: string;
  name: string;
};

export type errorType = {
  type: string;
  message: string;
  query: string;
};

export const useGetAllRoles = () => {
  const [allRoles, setAllRoles] = useState<roleType[]>([]);
  const [allRolesErrorStatus, setAllRolesErrorStatus] =
    useState<errorType | null>(null);
  const [
    GetAllRoles,
    { data, loading: loadingGetAllRoles, error, networkStatus },
  ] = useLazyQuery<{ getAllRoles: roleType[] }>(GQL_GET_ALL_ROLES, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    debugger;
    GetAllRoles();
  }, []);

  // Trigger this effect function when changed [data,error] props
  useEffect(() => {
    if (data && !error) {
      const { getAllRoles } = data;
      setAllRoles(getAllRoles);
    }
    if (!data && error) {
      if(networkStatus===NetworkStatus.loading){
        setAllRolesErrorStatus({
            type: ROLES_MODULE_API_ACTIVITIES.getAllRoles.query,
            message: ROLES_MODULE_API_ACTIVITIES.getAllRoles.loading,
            query: ROLES_MODULE_API_ACTIVITIES.getAllRoles.query,
          });
      }
      if (networkStatus === NetworkStatus.error) {
        setAllRolesErrorStatus({
          type: ROLES_MODULE_API_ACTIVITIES.getAllRoles.query,
          message: ROLES_MODULE_API_ACTIVITIES.getAllRoles.networkError,
          query: ROLES_MODULE_API_ACTIVITIES.getAllRoles.query,
        });
      }
    }
  }, [data, error, networkStatus]);

  return {
    allRoles,
    loadingGetAllRoles,
    allRolesErrorStatus,
  };
};
