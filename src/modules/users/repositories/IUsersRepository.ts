import { ICreateUserDTO } from "../dtos/CreateUserDTO";
import User from "../entities/User";

interface IUsersRepository {
  create({full_name,
    email,
    phone,
    cpf_number,
    current_balance,
    average_salary,
    status}: ICreateUserDTO): Promise<User>;

  findByCpf(cpf_number: string): Promise<User>;
}

export { IUsersRepository };