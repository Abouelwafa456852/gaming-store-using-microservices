/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponSchema } from './coupon.model'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }]), // Provide CouponModel
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
