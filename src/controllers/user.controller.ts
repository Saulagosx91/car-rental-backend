import { Request, Response } from "express";
import { UserService } from "@app/services/user.service";
import { HttpStatusCode } from "@app/common/http/httpStatusCode";
import { NotFoundException, ForbiddenException } from "@app/common/exceptions/httpException";
import { CreateUserDTO, LoginUserDTO } from "@app/dtos/user.dto";

const userService = new UserService();

export class UserController {
  async find(req: Request, res: Response) {
    try {
      const users = await userService.find();
      res.status(HttpStatusCode.OK).json(users);

    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatusCode.NOT_FOUND).send(error.message);
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data: CreateUserDTO = req.body;
      const token = await userService.create(data);

      res
        .cookie('authtoken', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production'
        })
        .send({ token });

    } catch (error) {
      if (error instanceof ForbiddenException) {
        return res.status(HttpStatusCode.FORBIDDEN).send(error.message)
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });

    }
  }

  async login(req: Request, res: Response) {
    try {
      const data: LoginUserDTO = req.body;
      const token = await userService.login(data.email, data.password);

      res
        .cookie('authtoken', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production'
        })
        .send({ token });

    } catch (error) {
      if (error instanceof ForbiddenException) {
        return res.status(HttpStatusCode.FORBIDDEN).send(error.message)
      }
      if (error instanceof NotFoundException) {
        return res.status(HttpStatusCode.NOT_FOUND).send(error.message);
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }
}