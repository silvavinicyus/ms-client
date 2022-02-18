import { Request, Response } from "express";
import { container } from "tsyringe";
import ListClientByStatusUseCase from "./ListClientByStatusUseCase";

export default class ListClientByStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { status } = request.query;

    const listClientByStatusUseCase = container.resolve(ListClientByStatusUseCase);

    const users = await listClientByStatusUseCase.execute(String(status));

    return response.json(users);
  }
}