/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly createdAt: Date;
}

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'User'], // Allowed roles
    default: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = model<User>('UserSchema', UserSchema);
