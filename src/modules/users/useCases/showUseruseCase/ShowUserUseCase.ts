import { response } from "express";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import User from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email?: string;
  cpf?: string;
}

@injectable()
export default class ShowUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}  

  async execute({email,  cpf}: IRequest): Promise<User> {
    let user: User;
    

    if(email !== 'undefined') {
      user = await this.usersRepository.findByEmail(email);      
    } if (cpf !== 'undefined') {      
      user = await this.usersRepository.findByCpf(cpf);              
    }

    if(!user) {            
      throw new AppError("There is no user with the given email");
    }    

    return user;
  }
}