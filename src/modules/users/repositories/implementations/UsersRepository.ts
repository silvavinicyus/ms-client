import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/CreateUserDTO";
import User from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

interface IRequest {
  email: string;
  newBalance: number;
}


export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async index(): Promise<User[]> {
    const users = await this.repository.find();
    
    return users;
  }

  async findByStatus(status: string): Promise<User[]> {
    const users = await this.repository.find({status});

    return users;
  }

  async changeBalance({ email, newBalance }: IRequest): Promise<User> {
    const user = await this.repository.findOne({email});

    user.current_balance = newBalance;

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