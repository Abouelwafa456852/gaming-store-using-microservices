/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Review } from './review.model';

@Injectable()
export class ReviewService {
  constructor(@Inject('ReviewModel') private readonly reviewModel: Model<Review>) {}

  async create(review: Review): Promise<Review> {
    const newReview = new this.reviewModel(review);
    return await newReview.save();
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewModel.find().exec();
  }

  async findOne(id: string): Promise<Review> {
    return await this.reviewModel.findById(id).exec();
  }

  async update(id: string, review: Review): Promise<Review> {
    return await this.reviewModel.findByIdAndUpdate(id, review, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.reviewModel.deleteOne({ _id: id }).exec();
  }
}
