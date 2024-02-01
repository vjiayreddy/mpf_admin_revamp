import { gql } from "@apollo/client";
import { PERSONALIZE_SCREENS } from "../fragments";

export const GET_PERSONALIZE_FORM_BY_ID = gql`
  ${PERSONALIZE_SCREENS}
  query GetPersonalizeForm($filter: PersonalizeFormFilterInput) {
    getPersonalizeForm(filter: $filter) {
      dependencyFormIds
      name
      label
      userSelections {
        master_name
        value
      }
      screens {
        ...PersonalizeScreens
      }
    }
  }
`;
