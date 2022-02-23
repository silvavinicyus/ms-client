import { inject, injectable } from "tsyringe";
import User from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  starting_date: Date;
  ending_date: Date;
}

@injectable()
export default class ListClientsByDateUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute({starting_date, ending_date}: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findByDate({starting_date, ending_date});

    return users;
  }
}