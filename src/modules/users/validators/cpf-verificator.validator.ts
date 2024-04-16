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
export class CpfIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
  async validate(value: any): Promise<boolean> {
    try {
      const userWithCpfExist = await this.userService.searchByCpf(value);
      return !userWithCpfExist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true;
      }
      return false;
    }
  }
}

export const CpfIsUnique = (validationOptions: ValidationOptions) => {
  return (object: object, propertie: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertie,
      options: validationOptions,
      constraints: [],
      validator: CpfIsUniqueValidator,
    });
  };
};
