import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PayrollInterface {
  id?: string;
  user_id: string;
  salary: number;
  bonus?: number;
  deductions?: number;
  net_pay?: number;
  pay_date: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PayrollGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
