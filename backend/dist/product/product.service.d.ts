import { Model } from 'mongoose';
import { Product } from './product.model';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, product: Product): Promise<Product>;
    delete(id: string): Promise<any>;
}
