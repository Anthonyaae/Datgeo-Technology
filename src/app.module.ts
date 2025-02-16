import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { DocumentsModule } from './documents/documents.module';
import { MulterModule } from '@nestjs/platform-express';
import { EmployeeDocument } from './employeeDocument/EmployeeDocument.entity';
import { DocumentType } from './documents/documents.entity';
import { Employee } from './employees/employees.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT as string),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      entities: [Employee, EmployeeDocument, DocumentType],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Employee, EmployeeDocument, DocumentType]),
    AuthModule,
    UsersModule,
    EmployeesModule,
    DocumentsModule,
    EmployeeDocument,
    DocumentType],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
