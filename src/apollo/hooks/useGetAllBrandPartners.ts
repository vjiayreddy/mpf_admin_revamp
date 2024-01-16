import { useLazyQuery } from "@apollo/client";
import { GET_ALL_BRAND_PARTNERS } from "../queries/brandPartners";
import { ImageVideoType } from "../common/types";

export interface BrandPartnerParams {
  limit: number;
  page: number;
  filter?: {
    brandPartnerCategoryIds: string;
    searchTerm: string;
  };
}

export type BrandPartnerType = {
  _id: string;
  name: string;
  note: string;
  title: string;
  url: string;
  logo: ImageVideoType;
};

export interface BrandPartnerResponse {
  totalCount: number;
  brandPartners: BrandPartnerType[];
}

const useGetAllBrandPartners = () => {
  const [GetAllBrandPartners, { data, loading, error }] = useLazyQuery<
    {
      getAllBrandPartners: BrandPartnerResponse;
    },
    BrandPartnerParams
  >(GET_ALL_BRAND_PARTNERS);

  return {
    GetAllBrandPartners,
    brandPartnersData: data?.getAllBrandPartners || null,
    isLoadingBrandPartners: loading,
    errorBrandPartners: error,
  };
};

export default useGetAllBrandPartners;
