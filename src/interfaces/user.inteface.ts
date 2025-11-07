import { Timestamp } from 'firebase/firestore';

export interface IUser {
  id: string;
  fullname: string;
  user_name: string;
  email: string;
  role: number;
  password: string;
  avatar: string;
  status: number;
  phone_number: string;
  birthday: string;
  created_at: Timestamp;
  updated_at?: Timestamp;
}
