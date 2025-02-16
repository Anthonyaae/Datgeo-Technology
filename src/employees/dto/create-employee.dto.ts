import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/users.entity';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  job_title: string;

  @IsNumber()
  salary: number;

  @IsString()
  documents: string;

  user: User; // <-- Agregamos la relación con User
}
