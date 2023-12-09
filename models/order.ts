import { OrderStatus } from '@utils/orderStatus';
import mongoose, { Schema, models } from 'mongoose';
import { v4 as uuid } from 'uuid';

const orderSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: uuid()
  },
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: OrderStatus,
    required: true,
    default: OrderStatus.PENDING,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  }
});

export default models.Order || mongoose.model('Order', orderSchema);