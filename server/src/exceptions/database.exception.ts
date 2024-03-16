import { DatabaseError } from 'sequelize';

import { ExceptionError } from './types/exception';

export class DatabaseException extends DatabaseError {
  readonly errorCode: number;
  readonly databaseError: DatabaseError;

  constructor(error: DatabaseError, { errorCode }: ExceptionError) {
    super(error);

    this.errorCode = errorCode;
    this.databaseError = error;
  }
}
