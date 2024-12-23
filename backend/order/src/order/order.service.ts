import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(@Inject('OrderModel') private readonly orderModel: Model<Order>) {}

  async create(order: Order): Promise<Order> {
    const newOrder = new this.orderModel(order);
    return await newOrder.save();
  }

  async findAll(userId?: string): Promise<Order[]> {
    if (userId) {
      return await this.orderModel.find({ userId }).exec(); // Filter by userId
    }
    return await this.orderModel.find().exec(); // Return all orders if no userId is provided
  }

  async findOne(id: string): Promise<Order> {
    return await this.orderModel.findById(id).exec();
  }

  async update(id: string, order: Order): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, order, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.orderModel.deleteOne({ _id: id }).exec();
  }
}
