import { Request, Response } from "express";
import { container } from "tsyringe";
import AddToBalanceUseCase from "./AddToBalanceUseCase";

export default class AddToBalanceController  {
  async handle(request: Request, response: Response): Promise<Response> {
    const { value, email } = request.body;              

    const addToBalanceUseCase = container.resolve(AddToBalanceUseCase);

    const result = await addToBalanceUseCase.execute({value, email});

    if(result.status === 404) {
      return response.status(404).json({error: result['error']});
    }

    return response.status(200).json(result);
  }
}