import { ICreateUserDTO } from "../dtos/CreateUserDTO";
import User from "../entities/User";

interface IRequest {
  email: string;
  value: number;
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

  changeBalance({email, value}: IRequest): Promise<User>;
}

export { IUsersRepository };