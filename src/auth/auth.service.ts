import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashSync, compareSync}from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User) 
    private readonly UserRepository:Repository<User>,
    private jwtService: JwtService
  ){}
  
  
  async create(createUserDto: CreateUserDto) {
    
    try{
      
      const newUser = this.UserRepository.create({
        ...createUserDto,
        password: hashSync(createUserDto.password,10)
        
      })
      
      const user = await this.UserRepository.save(newUser)
      
      return {
        username:user.username,
        token:this.getToken(user)
        }
    }
    catch(error){
      if(error.code === '23505'){
        throw new BadRequestException(`no se puede realizar el registro , verifique los datos `)
      }
      throw new InternalServerErrorException('Algo salió mal!!')
    }
  }
  
  
  async login(LoginUserDto: LoginUserDto) {
  
    const {password, username} = LoginUserDto
    const user = await this.UserRepository.findOne({
      where:{username}
    })
    if(user && compareSync(password,user.password))
      {
      return {
        username:user.username,
        token:this.getToken(user)
        }
      }
    throw new NotFoundException(`usuario o contraseña incorrecto`)
  
    
  }



  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }


  async update(updateUserDto: UpdateUserDto) {
    
    const { user_id, ...userData } = updateUserDto;

    const userToUpdate = await this.UserRepository.findOne({ where: { user_id } });
    if (!userToUpdate) {
        throw new Error(`Usuario con ID ${user_id} no encontrado.`);
    }

    const user = await this.UserRepository.update({ user_id }, userData);

    return user;
}


  remove(id: number) {
    return `This action removes a #${id} auth`;
  }




  private getToken(user:User):string{

    const {password, ...data_jwt} = user
    return this.jwtService.sign(data_jwt);
  }
}