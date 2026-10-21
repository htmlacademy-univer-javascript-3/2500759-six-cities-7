import { UserType } from './user';

export type ReviewType = {
  id: string;
  user: UserType;
  rating: number;
  comment: string;
  date: string;
};
