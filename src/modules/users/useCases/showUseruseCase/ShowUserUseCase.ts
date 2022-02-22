import { response } from "express";
import { inject, injectable } from "tsyringe";
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

  async execute({email,  cpf}: IRequest) {
    let user: User;
    

    if(email !== 'undefined') {
      user = await this.usersRepository.findByEmail(email);      
    } if (cpf !== 'undefined') {      
      user = await this.usersRepository.findByCpf(cpf);              
    }  

    if(!user) {            
      return {        
        status: 404,
        error: `There is no user with the given information`,
      };
    } 

    return user;
  }
}