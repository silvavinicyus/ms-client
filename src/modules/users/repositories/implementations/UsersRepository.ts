import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/CreateUserDTO";
import User from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

interface IRequest {
  email: string;
  value: number;
}


export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async changeBalance({ email, value }: IRequest): Promise<User> {
    const user = await this.repository.findOne({email});

    user.current_balance += value;

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({email});

    return user;
  }

  async findByCpf(cpf_number: string): Promise<User> {
    const user = await this.repository.findOne({cpf_number});

    return user;
  }

  async create({ full_name, email, phone, cpf_number, current_balance, average_salary, status }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      full_name,
      email,
      phone,
      cpf_number,
      current_balance,
      average_salary,
      status
    });

    await this.repository.save(user);

    return user;
  }
}