import React from "react";
import { useMutation } from "@apollo/client";
import { GET_USER_ADDRESSES, SAVE_USER_ADDRESS } from "../queries/user";

const useSaveUserAddresses = () => {
  const [SaveAddress, { loading, error }] = useMutation<
    {
      saveAddress: { _id: string };
    },
    { address: any }
  >(SAVE_USER_ADDRESS, {
    refetchQueries: [
      {
        query: GET_USER_ADDRESSES,
        variables: {
          userId: "5f8c1f5f2927681218811212",
        },
      },
    ],
  });

  return {
    SaveAddress,
    isLoadingSaveAddress: loading,
    isErrorSaveAddress: error,
  };
};

export default useSaveUserAddresses;
