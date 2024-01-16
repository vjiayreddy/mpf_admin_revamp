import { gql } from "@apollo/client";
export const PERSONALIZE_SCREENS = gql`
  fragment PersonalizeScreens on PersonalizeFormScreen {
    questions {
      questionId
      question {
        type
        value
        input
        catId
        description
        optionTypeId
        infoHelpText
        isMandatory
        isMultipleChoice
        master_name
        optionsData {
          _id
          name
          image
        }
      }
    }
  }
`;
export const MASTER_PRODUCT_SINGLE_SELECT = gql`
  fragment MasterData on MasterProductSingleSelect {
    _id
    catId
    image
    name
    note
    personalizeImage
    sortOrder
  }
`;

export const MASTER_CATEGORIES = gql`
  fragment MasterCategories on MasterCategory {
    _id
    image
    isEnabled
    isEnabledForPersonalize
    label
    name
    personalizeImage
    personalizeNote
  }
`;

export const PRODUCT_TAGS = gql`
  fragment Tags on ProductTag {
    catTag
    image
    isModifiable
    isVisible
    label
    name
    value
  }
`;

export const MASTER_PRODUCT_BASIC_SELECT = gql`
  fragment MasterDataBasic on MasterProductBasicSelect {
    _id
    image
    name
    personalizeImage
    note
  }
`;

export const PRODUCT = gql`
  ${PRODUCT_TAGS}
  ${MASTER_PRODUCT_BASIC_SELECT}
  fragment Product on Product {
    _id
    code
    title
    qty
    description
    discPrice
    images
    isPer
    name
    pId
    pImgIndx
    pidSerial
    price
    warranty
    isAvailable
    producttypeId
    fabric {
      ...MasterDataBasic
    }
    secondaryColor {
      _id
      color
      colorname
      label
    }
    secondaryColorId
    size
    deliveryDays
    delivery
    tags {
      ...Tags
    }
  }
`;

export const LOOKS = gql`
  ${PRODUCT}
  fragment Look on Look {
    _id
    images
    name
    price
    products {
      ...Product
    }
  }
`;

export const CATEGORY = gql`
  fragment Category on MasterCategory {
    _id
    image
    isEnabled
    isEnabledForPersonalize
    label
    name
    personalizeImage
    personalizeNote
    seo {
      altText
      content_description
      h1_tag
      h2_tag
      meta_description
      title
    }
  }
`;

export const SEO_OCCASION_CONFIG = gql`
  fragment Seo on SeoOccasionConfig {
    content_description
    h1_tag
    h2_tag
    meta_description
    title
  }
`;

export const DATE_TIME = gql`
  fragment DateTime on DateTimeSchema {
    datestamp
    day
    hour
    minute
    month
    timestamp
    year
  }
`;

export const CART_STATUS = gql`
  ${DATE_TIME}
  fragment Status on StatusSchema {
    _id
    dateRecorded {
      ...DateTime
    }
    label
    userId
    note
    name
  }
`;

export const CART_ITEM = gql`
  fragment UserCartItem on CartItem {
    catId
    images
    isPer
    itemId
    measurementId
    name
    pIdSerial
    price
    producttypeId
    qty
    size
    styling {
      monogram
      note
      styles {
        catTag
        label
        image
        name
        value
      }
    }
    code
    couponCode
    deliveryDays
    disc
  }
`;

export const USER_ADDRESS = gql`
  fragment Address on UserAddress {
    _id
    city
    cityId
    country
    countryCode
    email
    firstName
    isDefault
    landmark
    lastName
    phone
    postalCode
    state
    streetAddress
    type
  }
`;

export const IMAGE_VIDEO_SCHEMA = gql`
  fragment ImageVideoSchema on BrandPartnerImageVideoSchema {
    isVideo
    note
    sortOrder
    type
    url
  }
`;
export const BRAND_OFFER_SCHEMA = gql`
  fragment BrandOfferSchema on BrandPartnerOfferSchema {
    code
    name
    note
    sortOrder
    title
  }
`;
export const BRAND_PARTNER_CATEGORY_SCHEMA = gql`
  fragment BrandPartnerCategorySchema on BrandPartnerCategorySchema {
    _id
    isAvailable
    name
    note
    title
  }
`;
