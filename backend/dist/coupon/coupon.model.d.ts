import { Schema, Document } from 'mongoose';
export interface Coupon extends Document {
    readonly code: string;
    readonly discount: number;
    readonly expirationDate: Date;
}
export declare const CouponSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    code: string;
    discount: number;
    expirationDate: NativeDate;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    code: string;
    discount: number;
    expirationDate: NativeDate;
}>> & import("mongoose").FlatRecord<{
    code: string;
    discount: number;
    expirationDate: NativeDate;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const CouponModel: import("mongoose").Model<Coupon, {}, {}, {}, Document<unknown, {}, Coupon> & Coupon & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
