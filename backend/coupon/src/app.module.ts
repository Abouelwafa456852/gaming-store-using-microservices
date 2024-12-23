/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouponModule } from './coupon/coupon.module';

import * as dotenv from 'dotenv'; // Import dotenv
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB),
    CouponModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
