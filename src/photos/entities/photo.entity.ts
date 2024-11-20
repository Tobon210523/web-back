import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn,JoinColumn,} from 'typeorm';
import { Listings } from 'src/listings/entities/listing.entity';  
  @Entity('photos')
  export class Photo {
    @PrimaryGeneratedColumn('uuid')
    photo_id: string; 
  
    @ManyToOne(() => Listings, (listings) => listings.photos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'listing_id' }) 
    listing: Listings;
  
    @Column({ type: 'varchar', length: 255 })
    photo_url: string; 
  
    @CreateDateColumn()
    created_at: Date; 
  }