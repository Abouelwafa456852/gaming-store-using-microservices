/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface Coupon extends Document {
  readonly code: string;
  readonly discount: number;
  readonly expirationDate: Date;
}

export const CouponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

export const CouponModel = model<Coupon>('CouponSchema', CouponSchema);
