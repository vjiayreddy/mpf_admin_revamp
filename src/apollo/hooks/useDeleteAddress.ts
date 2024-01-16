import { useMutation } from "@apollo/client";
import { DELETE_ADDRESS, GET_USER_ADDRESSES } from "../queries/user";
export const useDeleteAddress = () => {
  const [DeleteAddress, { loading, error }] = useMutation<
    {
      deleteAddress: any;
    },
    {
      userId?: string;
      addressId: string;
    }
  >(DELETE_ADDRESS, {
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
    DeleteAddress,
    isLoadingDeleteAddress: loading,
  };
};
