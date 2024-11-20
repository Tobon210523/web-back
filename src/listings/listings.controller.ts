import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createListingDto: CreateListingDto) {
    try {
      return await this.listingsService.create(createListingDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.listingsService.findAll();
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.listingsService.findOne(id);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    try {
      return await this.listingsService.findByUser(userId);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    try {
      return await this.listingsService.update(id, updateListingDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Body() body) {
    try {
      const user_id = body.user_id;
      return await this.listingsService.remove(id, user_id);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }
 
}
