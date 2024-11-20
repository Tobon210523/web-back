import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard)
  @Post('booking/:propertyId')
  async createBooking(@Param('propertyId') propertyId: string, @Body() createBookingDto: CreateBookingDto) {
    try {
      return await this.bookingsService.createBooking(propertyId, createBookingDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get('booking/:id')
  async getUserBookings(@Param('id') id: string, @Body() body) {
    try {
      const userId = body.user_id;
      return await this.bookingsService.getUserBookings(userId);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Delete('booking/:bookingId')
  async cancelBooking(@Param('bookingId') bookingId: string, @Body() body) {
    try {
      const userId = body.user_id;
      return await this.bookingsService.cancelBooking(bookingId, userId);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }
}
