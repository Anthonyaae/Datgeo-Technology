import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employees.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.user', 'user') // Une la relación con la tabla de usuarios
      .select([
        'employee.id',
        'employee.job_title',
        'employee.salary',
        'employee.documents',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
      ])
      .getMany();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.user', 'user') // Une la relación con la tabla de usuarios
      .select([
        'employee.id',
        'employee.job_title',
        'employee.salary',
        'employee.documents',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
      ])
      .where('employee.id = :id', { id })
      .getOne();
  
    if (!employee) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }
  
    return employee;
  }
  


async create(createEmployeeDto: CreateEmployeeDto) {
  const employee = this.employeeRepository.create(createEmployeeDto);
  const savedEmployee = await this.employeeRepository.save(employee);
  console.log("Empleado guardado:", savedEmployee); // Verificar si tiene un ID
  return savedEmployee;
}



  async getEmployeeWithDocuments(employeeId: number) {
    return await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['documents', 'documents.documentType'],
    });
  }
  
  async remove(id: number): Promise<boolean> {
    const employee = await this.findOne(id);
    if (!employee) {
      return false;
    }
    await this.employeeRepository.delete(id);
    return true;
  }
}
