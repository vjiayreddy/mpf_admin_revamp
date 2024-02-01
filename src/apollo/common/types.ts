export type personalizeFormFilterType = {
  Id: string;
  isEdit?: boolean;
  name?: string;
  questionId?: string;
  userId?: string;
};

export type personalizeScreenOptionsDataType = {
  _id: string | null;
  image: string;
  name: string;
};

export type personalizeScreenQuestionType = {
  _id: string | null;
  catId: string | null;
  categoryId: string | null;
  description: string;
  infoHelpText: string;
  input: string;
  isMandatory: boolean;
  isMultipleChoice: true;
  master_name: string;
  optionTypeId: string;
  optionsData: personalizeScreenOptionsDataType[];
  type: string;
  value: string[] | null;
};

export type personalizeScreenQuestionsType = {
  question: personalizeScreenQuestionType;
  questionId: string;
  questionSortOrder: number;
};

export type personalizeScreenType = {
  _id: string | null;
  questions: personalizeScreenQuestionsType[];
};

export type personalizeFormUserSelectionType = {
  catId: string;
  image: string;
  master_name: string;
  value: string;
};

export type ProductTagType = {
  catTag: string;
  image: string;
  isModifiable: boolean;
  isVisible: boolean;
  label: string;
  name: string;
  value: string;
};

export type MasterProductType = {
  _id: string;
  image: string;
  name: string;
  personalizeImage: string;
  note: string;
};

export type ColorType = {
  _id: string;
  color: string;
  colorname: string;
  label: string;
};

export type ImageVideoType = {
  isVideo: boolean;
  note: string;
  sortOrder: number;
  type: string;
  url: string;
};
