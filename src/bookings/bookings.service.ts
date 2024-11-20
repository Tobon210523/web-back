import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Listings } from 'src/listings/entities/listing.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) 
    private readonly bookingRepository:Repository<Booking>,
    @InjectRepository(Listings) 
    private readonly listingRepository:Repository<Listings>
  ){}
  async createBooking(propertyId: string, createBookingDto: CreateBookingDto) {
    const {user_id,start_date, end_date } = createBookingDto;

    const listing = await this.listingRepository.findOne({
      where: { listing_id: propertyId },
    });

    if (!listing) {
      throw new NotFoundException(`La propiedad con ID ${propertyId} no fue encontrada`);
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (startDate >= endDate) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
    }

    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalPrice = days * listing.price_per_night;

    const booking = this.bookingRepository.create({
      listing,
      user: { user_id: user_id },
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
    });

     const {user, ...data} = await this.bookingRepository.save(booking);
    return data
  }

  async getUserBookings(userId: string) {

    const bookings = await this.bookingRepository.find({
      where: { user: { user_id: userId } },
      relations: ['property'],
    });

    if (bookings.length === 0) {
      throw new NotFoundException(`No se encontraron reservas para el usuario con ID ${userId}`);
    }

    return bookings.map(({ user, ...booking }) => booking);
  }

  async cancelBooking(bookingId: string, userId: string) {
 

    const booking = await this.bookingRepository.findOne({
      where: { booking_id: bookingId },
      relations: ['user'], 
    });

    if (!booking) {
      throw new NotFoundException(`La reserva con ID ${bookingId} no fue encontrada`);
    }

   
    if (booking.user.user_id !== userId) {
      throw new ForbiddenException('No tienes permiso para cancelar esta reserva');
    }

     const currentDate = new Date();
    const startDate = new Date(booking.start_date);
    const timeDifference = startDate.getTime() - currentDate.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      throw new BadRequestException('La reserva no puede ser cancelada con menos de 24 horas de antelación');
    }

    await this.bookingRepository.remove(booking);

    return { message: `La reserva con ID ${bookingId} ha sido cancelada correctamente` };
  }
}
