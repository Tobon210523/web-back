import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @UseGuards(AuthGuard)
  @Post('photo/:propertyId')
  async createPhoto(@Param('propertyId') id: string, @Body() createPhotoDto: CreatePhotoDto) {
    try {
      return await this.photosService.createPhoto(id, createPhotoDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }
}
