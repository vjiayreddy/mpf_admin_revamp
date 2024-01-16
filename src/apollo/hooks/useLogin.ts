import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from "@apollo/client";
import apolloClient from "../apolloClient";
import { ADMIN_LOGIN } from "../queries/user";
import { loginPayloadType, loginResponseType } from "../shared/types";

export const userLogin = async (params: loginPayloadType) => {
  const client: ApolloClient<NormalizedCacheObject> = apolloClient;
  const response: ApolloQueryResult<any> = await client.query<
    { login: loginResponseType },
    loginPayloadType
  >({
    query: ADMIN_LOGIN,
    variables: params,
    fetchPolicy: "network-only",
  });
  return response;
};
