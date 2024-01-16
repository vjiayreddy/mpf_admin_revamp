import { useQuery } from "@apollo/client";
import { GET_ALL_OCCASIONS } from "../queries/products";

export type occasionSeoType = {
  content_description: string;
  h1_tag: string;
  h2_tag: string;
  meta_description: string;
  title: string;
};

export type categorySeoType = {
  altText: string;
  content_description: string;
  h1_tag: string;
  h2_tag: string;
  meta_description: string;
  title: string;
};

export type occasionCategoryType = {
  _id: string;
  image: string;
  isEnabled: boolean;
  isEnabledForPersonalize: boolean;
  label: string;
  name: string;
  personalizeImage: string;
  personalizeNote: string;
  seo: categorySeoType;
};
export interface getOccasionsResponse {
  _id: string;
  name: string;
  label: string;
  catIds: string[];
  occasionType: string;
  categories: occasionCategoryType[];
  seo: occasionSeoType;
}

const useGetAllOccasions = () => {
  const { data, loading, error } = useQuery<{
    getAllOccasions: getOccasionsResponse[];
  }>(GET_ALL_OCCASIONS);

  return {
    occasionsData: data?.getAllOccasions,
    loadingAllOccasions: loading,
    errorAllOccasions: error,
  };
};

export default useGetAllOccasions;
