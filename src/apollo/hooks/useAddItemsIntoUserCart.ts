import { useMutation } from "@apollo/client";
import {
  ADD_ITEMS_TO_USER_CART,
  GET_USER_CART_BY_USER_ID,
} from "../queries/cart";
import { CartItemType } from "../../src/services/types";

export type AddItemsToCartInputType = {
  items: CartItemType[];
  note?: string;
  userId: string;
};

export type AddItemsToUserCartParamsType = {
  cart: AddItemsToCartInputType;
};

export const useAddItemsIntoUserCart = () => {
  const [AddItemsToUserCart, { loading, error }] = useMutation<
    {
      addItemsToUserCart: {
        _id: string;
      };
    },
    AddItemsToUserCartParamsType
  >(ADD_ITEMS_TO_USER_CART, {
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
    AddItemsToUserCart,
    isAddingItemsIntoCart: loading,
    errorAddItemsIntoCart: error,
  };
};
