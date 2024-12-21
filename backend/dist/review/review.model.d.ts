import { Schema, Document } from 'mongoose';
export interface Review extends Document {
    readonly productId: string;
    readonly userId: string;
    readonly rating: number;
    readonly comment: string;
    readonly createdAt: Date;
}
export declare const ReviewSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    createdAt: NativeDate;
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ReviewModel: import("mongoose").Model<Review, {}, {}, {}, Document<unknown, {}, Review> & Review & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
