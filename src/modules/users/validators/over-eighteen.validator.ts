import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
@Injectable()
@ValidatorConstraint({ async: true })
export class OverEighteenValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
  async validate(value: any): Promise<boolean> {
    try {
      const isOverEighteen = await this.userService.checkYearsOld(value);
      return isOverEighteen;
    } catch (error) {
      if (error instanceof BadRequestException) {
        return true;
      }
      return true;
    }
  }
}
export const IsOverEighteen = (validationOptions: ValidationOptions) => {
  return (object: object, propertie: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertie,
      options: validationOptions,
      constraints: [],
      validator: OverEighteenValidator,
    });
  };
};
