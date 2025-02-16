import { EmployeeDocument } from 'src/employeeDocument/EmployeeDocument.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('t_document_types')
export class DocumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => EmployeeDocument, (document) => document.documentType)
  documents: EmployeeDocument[];
}
