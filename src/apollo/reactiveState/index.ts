import { makeVar } from "@apollo/client";
import { getOccasionsResponse } from "../hooks/useGetAllOccasions";
export const themeModeVar = makeVar("light");
export const reactiveNavMenus = makeVar<getOccasionsResponse[]>([]);
export const setGlobalGqlErrorState = makeVar<any>(null);
