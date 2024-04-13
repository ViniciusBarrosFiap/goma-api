import {
  ValidationOptions,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsersService } from '../users.service';
import { NotFoundException } from '@nestjs/common';

export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    try {
      const userAlredyExist = await this.userService.searchWithEmail(email);

      return !userAlredyExist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true;
      }

      return true;
    }
  }
}
export const EmailIsUnique = (validationOptions: ValidationOptions) => {
  return (object: object, properties: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: properties,
      options: validationOptions,
      constraints: [],
      validator: EmailIsUniqueValidator,
    });
  };
};
