import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user?: UserInterface[];

  _count?: {
    user?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  name?: string;
}
