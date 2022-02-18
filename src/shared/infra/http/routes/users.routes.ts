import { Router } from "express";
import AddToBalanceController from "../../../../modules/users/useCases/addToBalance/AddToBalanceController";
import ListClientByStatusController from "../../../../modules/users/useCases/listClientByStatus/ListClientByStatusController";
import RemoveFromBalanceController from "../../../../modules/users/useCases/removeFromBalance/RemoveFromBalanceController";
import ShowUserController from "../../../../modules/users/useCases/showUseruseCase/ShowUserController";

const userRoutes = Router();


const showUserController = new ShowUserController();
const addToBalanceController = new AddToBalanceController();
const removeFromBalanceController = new RemoveFromBalanceController();
const listClientByStatusController = new ListClientByStatusController();

userRoutes.get('/email/:email', showUserController.handle);

userRoutes.post('/add/balance', addToBalanceController.handle);

userRoutes.post('/remove/balance', removeFromBalanceController.handle);

userRoutes.get('/', listClientByStatusController.handle);



export default userRoutes;