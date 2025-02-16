import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('t_employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job_title: string;

  @Column()
  salary: number;

  @Column()
  documents: string;

  @OneToOne(() => User, (user) => user.employee)
  user: User;
}
