export type userType = {
  _id: string;
  firstName?: string;
  lastName?: string;
};

// LOGIN
export type loginResponseType = {
  token?: string;
  user?: userType;
};

export type loginPayloadType = {
  source: string;
  password: string;
};
