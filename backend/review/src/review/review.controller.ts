/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // Create a new review
  @Post()
  async create(@Body() createReviewDto: Review): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  // Get all reviews
  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  // Get reviews by productId
  @Get('product/:productId')
  async findByProductId(@Param('productId') productId: string): Promise<Review[]> {
    return this.reviewService.findByProductId(productId); // Fetch reviews by productId
  }
  
  

  // Get a single review by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  // Update a review
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: Review): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto);
  }

  // Delete a review
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.reviewService.delete(id);
  }
}
