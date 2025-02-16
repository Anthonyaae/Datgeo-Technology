import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param, Delete, NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employees.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Get(':id')
async getEmployeeById(@Param('id') id: string): Promise<Employee> {
  console.log('ID recibido:', id);
  return this.employeesService.findOne(Number(id));
}


  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    console.log(createEmployeeDto);
    return this.employeesService.create(createEmployeeDto);
  }

  @Get(':id/documents')
async getEmployeeDocuments(@Param('id') id: string) {
  return this.employeesService.getEmployeeWithDocuments(Number(id));
}

@Delete(':id')
async deleteEmployee(@Param('id') id: string): Promise<{ message: string }> {
  const deleted = await this.employeesService.remove(Number(id));
  if (!deleted) {
    throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
  }
  return { message: 'Empleado eliminado correctamente' };
}
  
}
