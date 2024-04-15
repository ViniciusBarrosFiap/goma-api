import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: any): Promise<boolean> {
    try {
      console.log('teste');
      const userAlredyExist = await this.userService.searchWithEmail(value);

      return !userAlredyExist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true;
      }

      return true;
    }
  }
}
export const EmailIsUnique = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, properties: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: properties,
      options: validationOptions,
      constraints: [],
      validator: EmailIsUniqueValidator,
    });
  };
};
