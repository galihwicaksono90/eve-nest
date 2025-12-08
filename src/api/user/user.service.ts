import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async getById(id: string) {
    const user = await this.userModel.findByPk(id);
    console.log({ user, id });
    return user;
  }
}
