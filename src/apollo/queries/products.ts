import { gql } from "@apollo/client";
import { CATEGORY, PRODUCT, SEO_OCCASION_CONFIG } from "../fragments";

export const GET_ALL_OCCASIONS = gql`
  ${CATEGORY}
  ${SEO_OCCASION_CONFIG}
  query {
    getAllOccasions {
      categories {
        ...Category
      }
      label
      occasionType
      _id
      catIds
      name
      seo {
        ...Seo
      }
    }
  }
`;

export const GET_PRODUCTS_BY_FILTER = gql`
  query ProductsFilter($params: ProductFilter!, $limit: Int, $page: Int) {
    productsFilter(params: $params, limit: $limit, page: $page) {
      products {
        _id
        catId
        code
        deliveryDays
        description
        discPrice
        isPer
        images
        name
        title
        price
        price
        pImgIndx
        producttypeId
        size
        tags {
          catTag
          image
          isModifiable
          isVisible
          label
          name
          value
        }
      }
      totalItemCount
    }
  }
`;

export const GET_OCCASION_CONFIG = gql`
  ${CATEGORY}
  ${SEO_OCCASION_CONFIG}
  query GetOccasionConfig($occasionId: String!) {
    getOccasionConfig(occasionId: $occasionId) {
      seo {
        ...Seo
      }
      faqs {
        question
        answer
      }
      categories {
        ...Category
      }
      sideFilters {
        isPriceRangeFilterEnabled
        colorFilters {
          _id
          color
          colorname
        }
        patternFilters {
          _id
          name
        }
        fabricFilters {
          _id
          name
        }
        occasionFilters {
          _id
          name
        }
        minPrice
        maxPrice
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT_BY_PRODUCT_NAME = gql`
  ${PRODUCT}
  query GetSingleProductByName($productName: String!) {
    getSingleProductByName(productName: $productName) {
      ...Product
    }
  }
`;
