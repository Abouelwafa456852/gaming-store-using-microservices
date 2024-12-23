/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Coupon } from './coupon.model';

@Injectable()
export class CouponService {
  constructor(@Inject('CouponModel') private readonly couponModel: Model<Coupon>) {}

  async create(coupon: Coupon): Promise<Coupon> {
    const newCoupon = new this.couponModel(coupon);
    return await newCoupon.save();
  }

  async findAll(): Promise<Coupon[]> {
    return await this.couponModel.find().exec();
  }

  async findOne(id: string): Promise<Coupon> {
    return await this.couponModel.findById(id).exec();
  }

  async update(id: string, coupon: Coupon): Promise<Coupon> {
    return await this.couponModel.findByIdAndUpdate(id, coupon, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.couponModel.deleteOne({ _id: id }).exec();
  }
}
