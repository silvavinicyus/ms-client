import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/CreateUserDTO";
import User from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute({full_name, email, phone, cpf_number, current_balance, average_salary, status}: ICreateUserDTO): Promise<User>{
    const userExists = await this.usersRepository.findByCpf(cpf_number);

    if(userExists) {
      throw new AppError('CPF already used!');
    }

    const user = await this.usersRepository.create({
      full_name, 
      email, 
      phone, 
      cpf_number, 
      current_balance, 
      average_salary, 
      status
    });0

    return user;
  }
}