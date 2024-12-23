import { Schema, Document } from 'mongoose';
export interface User extends Document {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly createdAt: Date;
}
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    createdAt: NativeDate;
    username: string;
    email: string;
    password: string;
    role: "Admin" | "User";
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    username: string;
    email: string;
    password: string;
    role: "Admin" | "User";
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    username: string;
    email: string;
    password: string;
    role: "Admin" | "User";
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const UserModel: import("mongoose").Model<User, {}, {}, {}, Document<unknown, {}, User> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
