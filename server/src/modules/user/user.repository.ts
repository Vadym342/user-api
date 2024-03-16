import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';

import { DATABASE_ERROR_CONTEXT, DatabaseException } from '@src/exceptions';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserResponseType } from './dto/get-one-user.response.dto';
import { GetUserListResponseDto, UserListType } from './dto/get-user-list.response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createOne(data: CreateUserDto): Promise<void> {
    try {
      await this.userRepository.create(data);
    } catch (error) {
      this.logger.log('Creating user exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_CREATE_ONE);
    }
  }

  async getOne(email: string): Promise<GetUserResponseType> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        attributes: { exclude: ['password', 'createdDate', 'updatedDate', 'deletedDate'] },
      });

      return user.dataValues;
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_GET_ONE);
    }
  }

  async getAuth(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_GET_AUTH_ONE);
    }
  }

  async getAll(): Promise<GetUserListResponseDto> {
    try {
      const users = await this.userRepository.sequelize.query<UserListType>(
        `
        SELECT 
          id,
          email,
          age,
          firstName,
          lastName
        FROM users;
      `,
        {
          type: QueryTypes.SELECT,
        },
      );

      return { total: users.length, data: users };
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_GET_MANY);
    }
  }

  async updateOne(id: string, data: UpdateUserDto): Promise<void> {
    try {
      await this.userRepository.update({ ...data }, { where: { id } });
    } catch (error) {
      this.logger.log('Updating User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_UPDATE_ONE);
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.userRepository.destroy({ where: { id } });
    } catch (error) {
      this.logger.log('Deleting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_DELETE_ONE);
    }
  }
}
