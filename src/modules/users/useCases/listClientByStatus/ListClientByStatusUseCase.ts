import { inject, injectable } from "tsyringe";
import User from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export default class ListClientByStatusUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute(status?: string): Promise<User[]> {
    let users: User[];

    console.log(status);

    if(status !== 'undefined') {      
      users = await this.usersRepository.findByStatus(status);
    } else {
      console.log("entrou aqui")
      users = await this.usersRepository.index();
    }

    return users;
  }
}