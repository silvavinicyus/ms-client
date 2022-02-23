import { Router } from "express";
import AddToBalanceController from "../../../../modules/users/useCases/addToBalance/AddToBalanceController";
import ListClientByStatusController from "../../../../modules/users/useCases/listClientByStatus/ListClientByStatusController";
import ListClientsByDateController from "../../../../modules/users/useCases/listClientsByDate/ListClientsByDateController";
import RemoveFromBalanceController from "../../../../modules/users/useCases/removeFromBalance/RemoveFromBalanceController";
import ShowUserController from "../../../../modules/users/useCases/showUseruseCase/ShowUserController";

const userRoutes = Router();


const showUserController = new ShowUserController();
const addToBalanceController = new AddToBalanceController();
const removeFromBalanceController = new RemoveFromBalanceController();
const listClientByStatusController = new ListClientByStatusController();
const listClientsByDateController = new ListClientsByDateController();

userRoutes.get('/field', showUserController.handle);

userRoutes.post('/add/balance', addToBalanceController.handle);

userRoutes.post('/remove/balance', removeFromBalanceController.handle);

userRoutes.get('/', listClientByStatusController.handle);

userRoutes.get('/date', listClientsByDateController.handle);

export default userRoutes;