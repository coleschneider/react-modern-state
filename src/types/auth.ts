export interface ISession {
  user: {
    name: string;
    email: string;
    image: string;
  };
  id: number;
  expires: string;
  token: string;
}

export interface IToken {
  id: number;
  email: string;
  name: string;
  picture: string;
}

export interface IUser {
  id: number;
  name: string;
  image: string;
  email: string;
}
