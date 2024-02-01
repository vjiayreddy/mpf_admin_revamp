import { gql } from "@apollo/client";

export const GQL_GET_ALL_ROLES = gql`
  query GetAllRoles {
    getAllRoles {
      _id
      name
      label
    }
  }
`;

export const GQL_GET_ALL_TEAM_MEMBERS = gql`
  query GetAllTeams {
    getAllTeams {
      _id
      name
      phone
      email
      note
      image
      roleIdentifier
      isDeleted
      isEnabled
    }
  }
`;

export const GQL_GET_ALL_STYLISTS = gql`
  query GetAllStylists {
    getAllStylists {
      _id
      name
      phone
      email
      note
      image
    }
  }
`;

export const GQL_GET_ALL_SALES_TEAMS = gql`
  query GetAllSalesTeam {
    getAllSalesTeam {
      _id
      name
      phone
      email
      note
      image
    }
  }
`;
