import { Request, Response } from "express";
import { container } from "tsyringe";
import RemoveFromBalanceUseCase from "./RemoveFromBalanceUseCase";

export default class RemoveFromBalanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { value, email } = request.body;    

    const removeFromBalanceUseCase = container.resolve(RemoveFromBalanceUseCase);

    const userResult = await removeFromBalanceUseCase.execute({email, value});

    return response.json(userResult);
  }
}