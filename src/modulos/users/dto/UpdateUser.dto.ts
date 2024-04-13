import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUser.dto';

export class UpdateUserDTO extends PartialType(CreateUserDto) {}
