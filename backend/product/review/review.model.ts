/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface Review extends Document {
  readonly productId: string;
  readonly userId: string;
  readonly rating: number;
  readonly comment: string;
  readonly createdAt: Date;
}

export const ReviewSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ReviewModel = model<Review>('ReviewSchema', ReviewSchema);
