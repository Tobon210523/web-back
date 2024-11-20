import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn,JoinColumn,} from 'typeorm';
import { Listings } from 'src/listings/entities/listing.entity';
import { User } from 'src/auth/entities/user.entity';
  
  @Entity('reviews')
  export class Review {
    @PrimaryGeneratedColumn('uuid')
    review_id: string; 
  
    @ManyToOne(() => Listings, (listings) => listings.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'listing_id' }) 
    listing: Listings;
  
    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' }) 
    user: User;
  
    @Column({ type: 'int', width: 1 })
    rating: number; 
  
    @Column({ type: 'text', nullable: true })
    comment: string; 
  
    @CreateDateColumn()
    created_at: Date; 
  }
  