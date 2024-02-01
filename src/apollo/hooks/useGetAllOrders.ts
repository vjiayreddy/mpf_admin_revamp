import { useLazyQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "../queries/orders";

export type DateFormateType = {
  timestamp: string;
};

export interface ProductOrderType {
  _id: string;
  discTotal: number;
  orderId: string;
  orderTotal: string;
  orderDateTime: DateFormateType;
}

export interface getAllUserProductOrdersParams {
  userId: string;
  limit: number;
  page: number;
}

const useGetAllOrders = () => {
  const [getAllUserProductOrders, { data, loading, error }] = useLazyQuery<
    {
      getAllUserProductOrders: ProductOrderType[];
    },
    getAllUserProductOrdersParams
  >(GET_ALL_ORDERS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  return {
    getAllUserProductOrders,
    allOrders: data?.getAllUserProductOrders || [],
    isLoadingOrders: loading,
    errorAllOrders: error,
  };
};

export default useGetAllOrders;
