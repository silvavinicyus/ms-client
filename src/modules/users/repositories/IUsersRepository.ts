import { ICreateUserDTO } from "../dtos/CreateUserDTO";
import User from "../entities/User";

interface IRequest {
  email: string;
  newBalance: number;
}

interface IUsersRepository {
  create({full_name,
    email,
    phone,
    cpf_number,
    current_balance,
    average_salary,
    status}: ICreateUserDTO): Promise<User>;

  findByCpf(cpf_number: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findByCpf(cpf_number: string): Promise<User>;

  changeBalance({email, newBalance}: IRequest): Promise<User>;
  
  findByStatus(status: string): Promise<User[]>;

  index(): Promise<User[]>;
}

export { IUsersRepository };