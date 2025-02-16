import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('El ID proporcionado no es válido');
    }
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    }
    return user;
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
        where: { email },
        relations: ['employee'],
    });
}


  async create(userData: Partial<User>): Promise<User> {
    return this.userRepository.save(userData);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
