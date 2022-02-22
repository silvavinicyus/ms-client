import { Request, Response } from "express";
import { container } from "tsyringe";
import RemoveFromBalanceUseCase from "./RemoveFromBalanceUseCase";

export default class RemoveFromBalanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { value, email } = request.body;    

    const removeFromBalanceUseCase = container.resolve(RemoveFromBalanceUseCase);

    const userResult = await removeFromBalanceUseCase.execute({email, value});

    if(userResult.status === 404) {
      return response.status(404).json({error: userResult['error']});
    }

    return response.json(userResult);
  }
}