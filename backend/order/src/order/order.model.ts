/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface Order extends Document {
  readonly userId: string;
  readonly productIds: string[];
  readonly totalAmount: number;
  readonly orderDate: Date;
  readonly status: string;
}

export const OrderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  productIds: {
    type: [String],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Cancelled'], // Define allowed status values
  },
});

export const OrderModel = model<Order>('OrderSchema', OrderSchema);
