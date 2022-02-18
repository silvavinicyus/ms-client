import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowUserUseCase from "./ShowUserUseCase";

export default class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, cpf } = request.query;         

    const showUserUsecase = container.resolve(ShowUserUseCase);
    
    const user = await showUserUsecase.execute({email: String(email), cpf: String(cpf)});       

    return response.json(user);
  }
}