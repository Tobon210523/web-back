import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @UseGuards(AuthGuard)
  @Post('review/:propertyId')
  async leaveReview(@Param('propertyId') propertyId: string, @Body() createReviewDto: CreateReviewDto) {
    try {
      const { user_id, ...data } = createReviewDto;
      return await this.reviewService.leaveReview(propertyId, user_id, createReviewDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get('propertyReviews/:propertyId')
  async getReviewsByProperty(@Param('propertyId') propertyId: string) {
    try {
      return await this.reviewService.getReviewsByProperty(propertyId);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }
}
