import { Repository } from 'typeorm';
import { Employee } from './employees.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeRepository extends Repository<Employee> {
  constructor(@InjectRepository(Employee) private repo: Repository<Employee>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }
}
