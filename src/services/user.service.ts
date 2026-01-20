import bcrypt from 'bcrypt';
import User from '@app/models/user.model';
import { ForbiddenException, NotFoundException } from '@app/common/exceptions/httpException';
import { CreateUserDTO } from '@app/dtos/user.dto';
import { createToken } from '@app/utils/jwt';

export class UserService {
  async find() {
    const users = await User.findAll();
    if (!users) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async findOne(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async create(data: CreateUserDTO) {
    const userExists = await User.findOne({
      where: {
        email: data.email
      }
    });

    if (userExists) {
      throw new ForbiddenException('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;

    const user = await User.create(data);

    const token = createToken({ id: user.id, email: user.email });

    return token;
  }

  async login(email: string, password: string) {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) throw new NotFoundException('User not found');

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (verifyPassword) {
      const token = createToken({ id: user.id, email: user.email });
      return token;
    }

    throw new ForbiddenException('The password entered was incorrect');

  }

  async update() {
    return null;
  }

  async remove() {
    return true;
  }
}
