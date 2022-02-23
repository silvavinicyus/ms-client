import { Request, Response } from "express";
import { container } from "tsyringe";
import ListClientsByDateUseCase from "./ListClientsByDateUseCase";

export default class ListClientsByDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { starting_date, ending_date } = request.query;

    const listClientsByDateUseCase = container.resolve(ListClientsByDateUseCase);    

    const users = await listClientsByDateUseCase.execute({starting_date: new Date(String(starting_date)), ending_date: new Date(String(ending_date))});

    return response.json(users);
  }
}