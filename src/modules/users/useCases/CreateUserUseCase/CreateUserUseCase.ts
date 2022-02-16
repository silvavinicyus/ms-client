import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/CreateUserDTO";
import User from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
  user: User,
  error?: string;    
}

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute({full_name, email, phone, cpf_number,  average_salary }: ICreateUserDTO): Promise<IResponse> {
    const userExists = await this.usersRepository.findByCpf(cpf_number);

    if(userExists && userExists.status.toLowerCase() === 'denied') {     
      return {
        user: userExists,
        'error': `You are not elegible to create an account!${cpf_number}`
      };      
    } else if (userExists) {      
      return {
        user: userExists,
        'error': 'CPF already used!'
      }      
    }

    let status: string;
    let current_balance: number;
    if(average_salary < 500) {
      status = 'denied';
      current_balance = 0;
    } else {
      status = 'approved';
      current_balance = 200;
    }

    const user = await this.usersRepository.create({
      full_name, 
      email, 
      phone, 
      cpf_number, 
      current_balance, 
      average_salary, 
      status
    });
    
    return { user };
  }
}