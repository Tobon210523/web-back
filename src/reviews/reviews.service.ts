import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreatePhotoDto } from 'src/photos/dto/create-photo.dto';
import { Repository } from 'typeorm';
import { Listings } from 'src/listings/entities/listing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/photos/entities/photo.entity';
import { Review } from './entities/review.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Listings) 
    private readonly listingRepository:Repository<Listings>,
    @InjectRepository(Review) 
    private readonly reviewRepository:Repository<Review>,
    @InjectRepository(Booking) 
    private readonly bookingRepository:Repository<Booking>,
  ){}
  
  async leaveReview(propertyId: string, userId: string, createReviewDto: CreateReviewDto) {
    const { rating, comment } = createReviewDto;

    // Verificar si la propiedad existe
    const listing = await this.listingRepository.findOne({
      where: { listing_id: propertyId },
    });

    if (!listing) {
      throw new NotFoundException(`La propiedad con ID ${propertyId} no fue encontrada`);
    }

    // Verificar si el usuario ha reservado esta propiedad
    const booking = await this.bookingRepository.findOne({
      where: { listing: { listing_id: propertyId }, user: { user_id: userId } },
    });

    if (!booking) {
      throw new ForbiddenException('No puedes dejar una valoración para una propiedad que no has reservado');
    }

    // Verificar si el usuario ya dejó una valoración para esta propiedad
    const existingReview = await this.reviewRepository.findOne({
      where: { listing: { listing_id: propertyId }, user: { user_id: userId } },
    });

    if (existingReview) {
      throw new BadRequestException('Ya has dejado una valoración para esta propiedad');
    }

    // Crear y guardar la valoración
    const review = this.reviewRepository.create({
      listing,
      user: { user_id: userId }, // Relación con el usuario autenticado
      rating,
      comment,
    });

    return await this.reviewRepository.save(review);
  }

  async getReviewsByProperty(propertyId: string) {
    
    const listing = await this.listingRepository.findOne({
      where: { listing_id: propertyId },
    });

    if (!listing) {
      throw new NotFoundException(`La propiedad con ID ${propertyId} no fue encontrada`);
    }

    
    const reviews = await this.reviewRepository.find({
      where: { listing: { listing_id: propertyId } },
      relations: ['user'], 
    });

    return reviews.map(({ user, ...review }) => ({
      ...review,
      user: {
        username: user.username, 
      },
    }));
  }

}
