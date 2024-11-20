import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn,JoinColumn,} from 'typeorm';
import { Listings } from 'src/listings/entities/listing.entity';
import { User } from 'src/auth/entities/user.entity';
  
  @Entity('bookings')
  export class Booking {
    @PrimaryGeneratedColumn('uuid')
    booking_id: string;
  
    @ManyToOne(() => Listings, listings => listings.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'listing_id' }) 
    listing: Listings;
  
    @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column({ type: 'date' })
    start_date: Date;
  
    @Column({ type: 'date' })
    end_date: Date; 
  
    @Column({ type: 'decimal'})
    total_price: number; 
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date; 
  }
  