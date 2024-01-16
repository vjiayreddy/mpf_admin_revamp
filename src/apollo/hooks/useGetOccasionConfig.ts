import { useLazyQuery } from "@apollo/client";
import { GET_OCCASION_CONFIG } from "../queries/products";
import { getOccasionsResponse } from "./useGetAllOccasions";

export type colorFiltersType = {
  _id: string;
  color: string;
  colorname: string;
};
export type FilterType = {
  _id: string;
  name: string;
};
export type occasionSideFilterType = {
  isPriceRangeFilterEnabled: boolean;
  colorFilters: colorFiltersType[];
  fabricFilters: FilterType[];
  occasionFilters: FilterType[];
  patternFilters: FilterType[];
  minPrice: number;
  maxPrice: number;
};

export interface OccasionConfigResponse extends getOccasionsResponse {
  sideFilters: occasionSideFilterType;
}

const useGetOccasionConfig = () => {
  const [GetOccasionConfig, { data, loading, error }] = useLazyQuery<
    {
      getOccasionConfig: OccasionConfigResponse;
    },
    { occasionId: string }
  >(GET_OCCASION_CONFIG);

  return {
    GetOccasionConfig,
    occasionConfigData: data?.getOccasionConfig || null,
    isLoadingOccasionConfig: loading,
    isErrorOccasionConfig: error,
  };
};

export default useGetOccasionConfig;
