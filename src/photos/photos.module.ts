import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Listings } from 'src/listings/entities/listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Listings])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
