import { gql } from "@apollo/client";
import { CART_ITEM, CART_STATUS, DATE_TIME, USER_ADDRESS } from "../fragments";

export const GET_SINGLE_ORDER_BY_ID = gql`
  ${USER_ADDRESS}
  ${CART_ITEM}
  ${DATE_TIME}
  ${CART_STATUS}
  query GetSingleProductOrder($orderId: String!) {
    getSingleProductOrder(orderId: $orderId) {
      _id
      couponCode
      discTotal
      email
      isCaptured
      firstName
      isCompleted
      isPaid
      isPaymentFailed
      isReady
      lastName
      note
      orderId
      orderTotal
      phone
      prefix
      razorPayId
      address {
        ...Address
      }
      items {
        ...UserCartItem
      }
      completedDateTime {
        ...DateTime
      }
      confDateTime {
        ...DateTime
      }
      orderDateTime {
        ...DateTime
      }
      paidDateTime {
        ...DateTime
      }
      readyDateTime {
        ...DateTime
      }
      status {
        ...Status
      }
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query GetAllUserProductOrders($userId: String!, $limit: Int, $page: Int) {
    getAllUserProductOrders(userId: $userId, limit: $limit, page: $page) {
      _id
      discTotal
      orderId
      orderTotal
      orderDateTime {
        timestamp
      }
    }
  }
`;
