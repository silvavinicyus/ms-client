import { response } from "express";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import User from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export default class ShowUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}  

  async execute(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);        

    if(!user) {            
      throw new AppError("There is no user with the given email");
    }    

    return user;
  }
}