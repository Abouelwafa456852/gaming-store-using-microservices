import { OrderService } from './order.service';
import { Order } from './order.model';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: Order): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: Order): Promise<Order>;
    remove(id: string): Promise<any>;
}
