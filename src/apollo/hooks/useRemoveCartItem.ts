import { useMutation } from "@apollo/client";
import {
  GET_USER_CART_BY_USER_ID,
  REMOVE_CART_ITEM_FORM_USER_CART,
} from "../queries/cart";

const useRemoveCartItem = () => {
  const [RemoveItemFromUserCart, { loading, error }] = useMutation<
    {
      removeItemFromUserCart: { _id: string };
    },
    { cartId: string; itemId: string }
  >(REMOVE_CART_ITEM_FORM_USER_CART, {
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
    RemoveItemFromUserCart,
    isRemoveItemFromCart: loading,
    errorRemoveItemFromCart: error,
  };
};

export default useRemoveCartItem;
