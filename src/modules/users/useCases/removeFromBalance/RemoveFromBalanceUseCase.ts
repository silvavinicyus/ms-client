import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  value: number;
  email: string;
}

@injectable()
export default class RemoveFromBalanceUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute( { value, email }: IRequest ) {
    const userExists = await this.usersRepository.findByEmail(email);       

    if(!userExists) {      
      throw new AppError(`There is no user with the given email${email}`);
    }  

    const balance = userExists.current_balance;
    const newBalance = balance - value;

    const result = await this.usersRepository.changeBalance({email, newBalance})

    return result;
  }
}