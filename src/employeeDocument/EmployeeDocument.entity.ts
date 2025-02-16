import { DocumentType } from 'src/documents/documents.entity';
import { Employee } from 'src/employees/employees.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity('t_employee_documents')
export class EmployeeDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileUrl: string;

  @ManyToOne(() => Employee, (employee) => employee.documents)
  employee: Employee;

  @ManyToOne(() => DocumentType, (documentType) => documentType.documents)
  documentType: DocumentType;
}
