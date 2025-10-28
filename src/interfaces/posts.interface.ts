import { Timestamp } from 'firebase/firestore';

export interface IPosts {
  id: string;
  hot: boolean;
  title: string;
  image: string;
  slug: string;
  category_id: string;
  user_id: string;
  status: number;
  created_at: Timestamp;
}

export interface ICategory {
  slug: string;
  user_id: string;
  category: string;
  created_at: Timestamp;
  status: number;
}

export interface IUser {
  email: string;
  password: string;
  uid: string;
  fullname: string;
}
