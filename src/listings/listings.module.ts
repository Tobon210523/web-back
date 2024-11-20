import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { Listings } from './entities/listing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Listings, User])],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
