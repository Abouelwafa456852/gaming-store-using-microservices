import { Schema, Document } from 'mongoose';
export interface Product extends Document {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly stock: number;
}
export declare const ProductSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    description: string;
    price: number;
    stock: number;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    description: string;
    price: number;
    stock: number;
}>> & import("mongoose").FlatRecord<{
    name: string;
    description: string;
    price: number;
    stock: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ProductModel: import("mongoose").Model<Product, {}, {}, {}, Document<unknown, {}, Product> & Product & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
