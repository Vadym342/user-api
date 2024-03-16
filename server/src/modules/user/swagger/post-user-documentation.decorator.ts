import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { ApiThrowExceptions } from '@src/decorators/throw-exceptions.decorator';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

import { CreateUserDto } from '../dto/create-user.dto';

const {
  USER_ENTITY_NOT_FOUND,
  USER_ENTITY_ALREADY_EXIST,
  USER_FIRSTNAME_IS_NOT_STRING,
  USER_FIRSTNAME_LENGTH_INVALID,
  USER_EMAIL_LENGTH_INVALID,
  USER_EMAIL_IS_NOT_STRING,
  USER_LASTNAME_IS_NOT_STRING,
  USER_LASTNAME_LENGTH_INVALID,
  USER_AGE_INVALID,
  USER_PASSWORD_LENGTH_INVALID,
  USER_PASSWORD_IS_NOT_STRING,
} = VALIDATION_ERROR_CONTEXT;

export function PostUserAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Create User',
      description: `
        <p>Create User</p>
      `,
    }),
    ApiCreatedResponse({
      description: 'User sucssesfully created.',
    }),
    ApiThrowExceptions({
      '400': {
        errors: [
          USER_FIRSTNAME_IS_NOT_STRING,
          USER_FIRSTNAME_LENGTH_INVALID,
          USER_EMAIL_LENGTH_INVALID,
          USER_EMAIL_IS_NOT_STRING,
          USER_LASTNAME_IS_NOT_STRING,
          USER_LASTNAME_LENGTH_INVALID,
          USER_AGE_INVALID,
          USER_PASSWORD_LENGTH_INVALID,
          USER_PASSWORD_IS_NOT_STRING,
        ],
        description: 'Please, make sure that you follow the contract and pass only valid properties and values',
      },
    }),
    ApiThrowExceptions({
      '404': {
        errors: [USER_ENTITY_NOT_FOUND],
        description: 'Please, make sure that input data are correct',
      },
    }),
    ApiThrowExceptions({
      '409': {
        errors: [USER_ENTITY_ALREADY_EXIST],
        description: 'Please, make sure that input data ',
      },
    }),
    ApiBody({
      type: CreateUserDto,
      examples: {
        validUserBodyExample: {
          value: validUserBodyExample,
        },
      },
    }),
  );
}

export const validUserBodyExample: CreateUserDto = {
  email: 'test.email@gmail.com',
  firstName: 'Harry',
  lastName: 'Potter',
  age: 21,
  password: 'akcio',
};
