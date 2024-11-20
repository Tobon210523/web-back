import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { Listings } from 'src/listings/entities/listing.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) 
    private readonly photoRepository:Repository<Photo>,
    @InjectRepository(Listings) 
    private readonly listingRepository:Repository<Listings>,
  ){}
  
  async createPhoto(idProperty:string,createPhotoDto:CreatePhotoDto){

    const {user_id,...data} = createPhotoDto

    const listing = await this.listingRepository.findOne({
      where: { listing_id: idProperty },
      relations: ['user'], 
    });

    if (!listing) {
      throw new NotFoundException(`La propiedad con ID ${idProperty} no fue encontrada`);
    }

    if (listing.user.user_id !== user_id) {
      throw new ForbiddenException(`No tienes permiso para agregar fotos a esta propiedad`);
    }

    const photo = this.photoRepository.create({
      listing,
      photo_url: data.photo_url,
    });

    return await this.photoRepository.save(photo);
  }
}
