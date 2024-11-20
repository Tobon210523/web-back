import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn, OneToMany,} from 'typeorm';
import { User } from 'src/auth/entities/user.entity'; 
import { Expose } from 'class-transformer';
import { Photo } from 'src/photos/entities/photo.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Review } from 'src/reviews/entities/review.entity';

  @Entity('listings') 
  export class Listings {
    @PrimaryGeneratedColumn('uuid')
    listing_id: string; 
  
    @ManyToOne(() => User, user => user.properties, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' }) 
    user: User; 

    @Expose()
    get user_id(): string {
      return this.user?.user_id; 
    }
  
    @Column({ type: 'varchar', length: 255 })
    title: string;
  
    @Column({ type: 'text' })
    description: string; 
  
    @Column({ type: 'varchar', length: 255 })
    address: string; 
  
    @Column({ type: 'decimal', precision: 10, scale: 7 })
    latitude: number; 
  
    @Column({ type: 'decimal', precision: 10, scale: 7 })
    longitude: number; 
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price_per_night: number; 
  
    @Column({ type: 'int' })
    num_bedrooms: number; 
  
    @Column({ type: 'int' })
    num_bathrooms: number;
  
    @Column({ type: 'int' })
    max_guests: number; 
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date; 
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date; 

    @OneToMany(() => Photo, photo => photo.listing)
    photos: Photo[];

    @OneToMany(() => Booking, booking => booking.listing)
    bookings: Booking[];

    @OneToMany(() => Review, review => review.listing)
  reviews: Review[];
  }
  