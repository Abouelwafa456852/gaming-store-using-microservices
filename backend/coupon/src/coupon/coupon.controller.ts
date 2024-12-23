/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { Coupon } from './coupon.model';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  async create(@Body() createCouponDto: Coupon): Promise<Coupon> {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  async findAll(): Promise<Coupon[]> {
    return this.couponService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Coupon> {
    return this.couponService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCouponDto: Coupon): Promise<Coupon> {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.couponService.delete(id);
  }
}
