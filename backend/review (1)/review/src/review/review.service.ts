/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Review } from './review.model';

@Injectable()
export class ReviewService {
  constructor(@Inject('ReviewModel') private readonly reviewModel: Model<Review>) {}

  // Create a new review
  async create(review: Review): Promise<Review> {
    const newReview = new this.reviewModel(review);
    return await newReview.save();
  }

  // Fetch all reviews
  async findAll(): Promise<Review[]> {
    return await this.reviewModel.find().exec();
  }

  // Fetch a single review by ID
  async findOne(id: string): Promise<Review> {
    return await this.reviewModel.findById(id).exec();
  }

  
  // Fetch reviews by productId
  async findByProductId(productId: string): Promise<Review[]> {
    return await this.reviewModel.find({ productId }).exec(); // Fetch reviews by productId
  }

  // Update a review by ID
  async update(id: string, review: Review): Promise<Review> {
    return await this.reviewModel.findByIdAndUpdate(id, review, { new: true }).exec();
  }

  // Delete a review by ID
  async delete(id: string): Promise<any> {
    return await this.reviewModel.deleteOne({ _id: id }).exec();
  }
}
