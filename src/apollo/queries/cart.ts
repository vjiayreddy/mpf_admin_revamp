import { gql } from "@apollo/client";

export const GET_USER_CART_BY_USER_ID = gql`
  query GetProductCartByUserId($userId: String!) {
    getProductCartByUserId(userId: $userId) {
      _id
      items {
        amount
        catId
        qty
        size
        name
        images
        itemId
        price
        producttypeId
        deliveryDays
        isPer
      }
      lId
      looks_id
      totalDiscount
      totalDiscountedPrice
      totalPrice
    }
  }
`;

export const GET_UPDATE_ITEM_QUANTITY = gql`
  mutation UpdateItemQuantityInUserCart(
    $cartId: String!
    $itemId: String!
    $quantity: Int!
  ) {
    updateItemQuantityInUserCart(
      cartId: $cartId
      itemId: $itemId
      quantity: $quantity
    ) {
      _id
    }
  }
`;

export const ADD_ITEMS_TO_USER_CART = gql`
  mutation AddItemsToUserCart($cart: AddItemsToCartInput!) {
    addItemsToUserCart(cart: $cart) {
      _id
    }
  }
`;

export const REMOVE_CART_ITEM_FORM_USER_CART = gql`
  mutation RemoveItemFromUserCart($cartId: String!, $itemId: String!) {
    removeItemFromUserCart(cartId: $cartId, itemId: $itemId) {
      _id
    }
  }
`;
