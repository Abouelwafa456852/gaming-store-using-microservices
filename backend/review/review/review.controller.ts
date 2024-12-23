/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: Review): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: Review): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.reviewService.delete(id);
  }
}
