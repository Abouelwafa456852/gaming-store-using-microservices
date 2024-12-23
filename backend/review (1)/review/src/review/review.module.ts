/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './review.model'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]), // Provide ReviewModel
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
