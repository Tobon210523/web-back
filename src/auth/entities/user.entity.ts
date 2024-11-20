import { Booking } from "src/bookings/entities/booking.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Listings } from "src/listings/entities/listing.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    user_id:string 
    
    @Column({type:'varchar', unique:true})
    username:string 
    
    @Column({type:'varchar', unique:true})
    email:string 
    
    @Column({type:'varchar'})
    password:string 
    
    @Column({type:'varchar',default:''})
    profile_picture:string 
    
    @Column({type:'varchar',default:''})
    bio:string 
    
    @Column({type: 'boolean', default:false})
    is_owner:boolean
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date; 

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date; 

    @OneToMany(() => Listings, listings => listings.user,{cascade:true})
    properties: Listings[]; 

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    @OneToMany(() => Review, review => review.user)
  reviews: Review[]; 

}