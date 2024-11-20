import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    username:string 
    
    @IsEmail()
    email:string 
    
    @IsString()
    password:string 
    
    @IsBoolean()
    is_owner:boolean
    
    @IsOptional()
    @IsString()
    profile_picture:string 
    
    @IsOptional()
    @IsString()
    bio:string 


}