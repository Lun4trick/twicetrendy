import { OrderStatus } from './orderStatus';

export interface OrderType {
  productIDs: string[];
  total: number;
  status: OrderStatus;
  userID: string;
  createdAt: Date;
  updatedAt: Date;
}