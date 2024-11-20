import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Listings } from 'src/listings/entities/listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Listings])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
