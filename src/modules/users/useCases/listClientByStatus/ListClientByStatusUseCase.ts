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

    if(status) {
      users = await this.usersRepository.findByStatus(status);
    } else {
      users = await this.usersRepository.index();
    }

    return users;
  }
}