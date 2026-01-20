import { Router } from "express";
import { UserController } from "@app/controllers/user.controller";
import { CreateUserDTO, LoginUserDTO } from "@app/dtos/user.dto";
import validateDto from "@app/middlewares/validateDto";
import { userAuthenticated, adminAuthenticated } from "@app/middlewares/checkAuthenticate";

const userRoutes = Router();
const userController = new UserController();

userRoutes
  .route('/')
  .get(userController.find)
  .post(validateDto(CreateUserDTO), userController.create);

userRoutes.get('/authenticate', userAuthenticated);

userRoutes.get('/authenticate/admin', adminAuthenticated);

userRoutes.post('/login', validateDto(LoginUserDTO), userController.login);

export default userRoutes;