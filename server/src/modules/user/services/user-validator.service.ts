import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ConflictException, VALIDATION_ERROR_CONTEXT } from '@src/exceptions';
import { NotFoundException } from '@src/exceptions/not-found.exception';

import { User } from '../entities/user.entity';

@Injectable()
export class UserValidatorService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}
  async doesUserExist(id?: string, email?: string): Promise<boolean> {
    let user = {};

    if (email) {
      user = await this.doesUserEntityExistByEmail(email);
    }

    if (id) {
      user = await this.doesUserEntityExistById(id);
    }

    if (!user) {
      throw new NotFoundException(VALIDATION_ERROR_CONTEXT.USER_ENTITY_NOT_FOUND);
    }

    return true;
  }

  async doesUserAlreadyCreated(email: string): Promise<boolean> {
    const user = await this.doesUserEntityExistByEmail(email);

    if (user) {
      throw new ConflictException(VALIDATION_ERROR_CONTEXT.USER_ENTITY_ALREADY_EXIST);
    }

    return true;
  }

  private async doesUserEntityExistByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });

    return !!user;
  }

  private async doesUserEntityExistById(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });

    return !!user;
  }
}
