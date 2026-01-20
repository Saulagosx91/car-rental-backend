import { ValidationError } from 'class-validator';
import { CustomException } from './customException';

export class HttpException extends CustomException {
  public name: string;
  constructor(public status: number = 400, message: string) {
    super(message);
    this.status = status;
    this.name = 'HttpException';
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found') {
    super(404, message);
    this.name = 'NotFoundException';
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request') {
    super(400, message);
    this.name = 'BadRequestException';
  }
}

export class ValidationException extends BadRequestException {
  public details: ValidationError[];
  constructor(message = 'Validation Error') {
    super(message);
    this.name = 'ValidationException';
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
    this.name = 'UnauthorizedException';
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden') {
    super(403, message);
    this.name = 'ForbiddenException';
  }
}
