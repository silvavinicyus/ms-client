import { container } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/CreateUserDTO";
import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserController {
  async handle(data: ICreateUserDTO) {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute(data);
    
    return user;
  }
}