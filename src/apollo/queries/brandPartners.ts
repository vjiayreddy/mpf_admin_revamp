import { gql } from "@apollo/client";
import {
  BRAND_OFFER_SCHEMA,
  BRAND_PARTNER_CATEGORY_SCHEMA,
  IMAGE_VIDEO_SCHEMA,
} from "../fragments";

export const GET_ALL_BRAND_PARTNERS = gql`
  ${IMAGE_VIDEO_SCHEMA}
  ${BRAND_OFFER_SCHEMA}
  ${BRAND_PARTNER_CATEGORY_SCHEMA}
  query GetAllBrandPartners($limit: Int!, $page: Int!) {
    getAllBrandPartners(limit: $limit, page: $page) {
      brandPartners {
        _id
        name
        note
        title
        url
        brandPartnerCategoryId
        logo {
          ...ImageVideoSchema
        }
        banner {
          ...ImageVideoSchema
        }
        offers {
          ...BrandOfferSchema
        }
        brandPartnerCategory {
          ...BrandPartnerCategorySchema
        }
      }
      totalCount
    }
  }
`;
