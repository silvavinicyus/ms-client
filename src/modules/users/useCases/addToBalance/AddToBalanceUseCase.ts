import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  value: number;
  email: string;
}

@injectable()
export default class AddToBalanceUseCase {
  constructor( 
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute( { value, email } ) {    
    const userExists = await this.usersRepository.findByEmail(email);       

    if(!userExists) {
      console.log("entrou aqui")
      throw new AppError(`There is no user with the given email${email}`);
    }    

    const balance = userExists.current_balance;

    const result = await this.usersRepository.changeBalance({email: userExists.email, value});   
    
    if(result.current_balance !== balance + value){      
      await this.usersRepository.changeBalance({email: userExists.email, value: balance});  
      throw new AppError("Error while making the statement");
    }

    return userExists;
  }
}