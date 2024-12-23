import { Schema, Document } from 'mongoose';
export interface Order extends Document {
    readonly userId: string;
    readonly productIds: string[];
    readonly totalAmount: number;
    readonly orderDate: Date;
    readonly status: string;
}
export declare const OrderSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    userId: string;
    productIds: string[];
    totalAmount: number;
    orderDate: NativeDate;
    status: "Pending" | "Completed" | "Cancelled";
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    userId: string;
    productIds: string[];
    totalAmount: number;
    orderDate: NativeDate;
    status: "Pending" | "Completed" | "Cancelled";
}>> & import("mongoose").FlatRecord<{
    userId: string;
    productIds: string[];
    totalAmount: number;
    orderDate: NativeDate;
    status: "Pending" | "Completed" | "Cancelled";
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const OrderModel: import("mongoose").Model<Order, {}, {}, {}, Document<unknown, {}, Order> & Order & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
