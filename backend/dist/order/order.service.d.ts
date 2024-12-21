import { Model } from 'mongoose';
import { Order } from './order.model';
export declare class OrderService {
    private readonly orderModel;
    constructor(orderModel: Model<Order>);
    create(order: Order): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, order: Order): Promise<Order>;
    delete(id: string): Promise<any>;
}
