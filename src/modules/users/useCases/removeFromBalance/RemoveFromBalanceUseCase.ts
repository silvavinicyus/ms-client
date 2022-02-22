import { inject, injectable } from "tsyringe";
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
      return {        
        status: 404,
        error: `There is no user with the given email`,
      };
    }   

    const balance = userExists.current_balance;
    const newBalance = balance - value;

    const result = await this.usersRepository.changeBalance({email, newBalance})

    return result;
  }
}