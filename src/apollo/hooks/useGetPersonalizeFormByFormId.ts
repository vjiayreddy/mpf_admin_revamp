import { useLazyQuery } from "@apollo/client";
import {
  personalizeFormFilterType,
  personalizeFormUserSelectionType,
  personalizeScreenType,
} from "../common/types";
import { GET_PERSONALIZE_FORM_BY_ID } from "../queries/onboarding";
import useGetAllOccasions from "./useGetAllOccasions";

const USER_ID = "5f8c1f5f2927681218811212";

export interface personalizeFormResponse {
  _id: string;
  label: string;
  name: string;
  screens: personalizeScreenType[];
  userSelections: personalizeFormUserSelectionType;
}

const useGetPersonalizeFormByFormId = () => {
 
  const [
    GetPersonalizeForm,
    { loading: loadingGPF, data: dataGPF, error: errorGPF },
  ] = useLazyQuery<
    { getPersonalizeForm: personalizeFormResponse },
    { filter: personalizeFormFilterType }
  >(GET_PERSONALIZE_FORM_BY_ID, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  const gqlGetPersonalizeFormById = async (
    params: personalizeFormFilterType
  ) => {
    const response = await GetPersonalizeForm({
      variables: {
        filter: {
          ...params,
          userId: USER_ID,
          isEdit: true,
        },
      },
    });

    return new Promise((resolve, reject) => {
      if (!response?.data && response?.error) {
        reject(response?.error);
      }
      return resolve(response?.data);
    });
  };

  return {
    loadingGPF,
    gqlGetPersonalizeFormById,
    dataGPF,
    errorGPF,
  };
};

export default useGetPersonalizeFormByFormId;
