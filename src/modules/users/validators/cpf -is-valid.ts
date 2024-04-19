import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../users.service';
import { Injectable } from '@nestjs/common';
@Injectable()
@ValidatorConstraint({ async: true })
export class cpfValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
  async validate(value: any): Promise<boolean> {
    try {
      const validateCpf = await this.userService.testCpf(value);
      return validateCpf;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
export const CpfIsValid = (validationOptions: ValidationOptions) => {
  return (object: object, propertie: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertie,
      options: validationOptions,
      constraints: [],
      validator: cpfValidator,
    });
  };
};
