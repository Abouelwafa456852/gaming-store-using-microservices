import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: Order): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query('userId') userId?: string): Promise<Order[]> {
    return this.orderService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: Order): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.orderService.delete(id);
  }
}
