import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDocument } from 'src/employeeDocument/EmployeeDocument.entity';
import { Employee } from 'src/employees/employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeDocument, Employee])],

  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
