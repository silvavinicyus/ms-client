import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowUserUseCase from "./ShowUserUseCase";

export default class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, cpf } = request.query;         

    const showUserUsecase = container.resolve(ShowUserUseCase);
    
    const user = await showUserUsecase.execute({email: String(email), cpf: String(cpf)});       

    if(user.status === 404) {
      return response.status(404).json({error: user['error']});
    }

    return response.json(user);
  }
}