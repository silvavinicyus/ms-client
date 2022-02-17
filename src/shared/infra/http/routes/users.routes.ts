import { Router } from "express";
import AddToBalanceController from "../../../../modules/users/useCases/addToBalance/AddToBalanceController";
import ShowUserController from "../../../../modules/users/useCases/showUseruseCase/ShowUserController";

const userRoutes = Router();


const showUserController = new ShowUserController();
const addToBalanceController = new AddToBalanceController();

userRoutes.get('/email/:email', showUserController.handle);

userRoutes.post('/add/balance', addToBalanceController.handle);

export default userRoutes;