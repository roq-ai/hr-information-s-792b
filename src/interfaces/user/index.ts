import { GetQueryInterface } from '../get-query.interface';

export interface UserInterface {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  locale: string;
  timezone: string;
  avatar_url: string;
  created_at: any;
  updated_at: any;
}

export interface UserGetQueryInterface extends GetQueryInterface {}
