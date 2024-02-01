import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GQL_GET_ALL_STYLISTS,
  GQL_GET_ALL_TEAM_MEMBERS,
} from "../queries/roleManagement";


export const useGetAllTeamMembers = () => {
  // State
  const [allTeamMembers, setAllTeamMembers] = useState<any[]>([]);

  const [
    GetAllTeams,
    { loading: loadingGetAllStylists, error: errorGetAllStylists, data },
  ] = useLazyQuery(GQL_GET_ALL_TEAM_MEMBERS);

  // This effect will trigger for the first time when useGetAllTeamMembers() called outside
  useEffect(() => {
    GetAllTeams();
  }, []);

  // This effect will trigger when data props changed
  useEffect(() => {
    if (data?.getAllTeams) {
      const { getAllTeams } = data;
      const _tempData = getAllTeams?.map((teamMember: any) => {
        return {
          ...teamMember,
          id: teamMember?._id,
        };
      });
      setAllTeamMembers(_tempData);
    }
  }, [data]);

  // This effect will trigger when errorGetAllStylists prop changed
  useEffect(() => {
    console.log(errorGetAllStylists);
  }, [errorGetAllStylists]);



  return {
    teamMembersData: allTeamMembers,
    loading: loadingGetAllStylists,
  };
};
