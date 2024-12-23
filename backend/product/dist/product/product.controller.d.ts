import { ProductService } from './product.service';
import { Product } from './product.model';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: Product): Promise<Product>;
    remove(id: string): Promise<any>;
}
