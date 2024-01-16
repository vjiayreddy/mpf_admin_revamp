import { useMutation } from "@apollo/client";
import {
  GET_UPDATE_ITEM_QUANTITY,
  GET_USER_CART_BY_USER_ID,
} from "../queries/cart";

export type UpdateItemQuantityInUserCartParams = {
  cartId: string;
  itemId: string;
  quantity: number;
};

interface UpdateItemQuantityInUserCartResponse {
  _id: string;
}

const useUpdateCartItemQuantity = () => {
  const [UpdateItemQuantityInUserCart, { loading, error }] = useMutation<
    { updateItemQuantityInUserCart: UpdateItemQuantityInUserCartResponse },
    UpdateItemQuantityInUserCartParams
  >(GET_UPDATE_ITEM_QUANTITY, {
    refetchQueries: [
      {
        query: GET_USER_CART_BY_USER_ID,
        variables: {
          userId: "5f8c1f5f2927681218811212",
        },
      },
    ],
  });

  return {
    UpdateItemQuantityInUserCart,
    isUpdatingItemQuantity: loading,
    isUpdatingItemError: error,
  };
};

export default useUpdateCartItemQuantity;
