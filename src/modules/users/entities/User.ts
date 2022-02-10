import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export default class User {
  @PrimaryColumn()
  id: number;

  @Column()
  secure_id: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  cpf_number: string;

  @Column()
  current_balance: number;

  @Column()
  average_salary: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}