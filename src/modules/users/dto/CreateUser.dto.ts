// import { PartialType } from '@nestjs/mapped-types';
// import { UserEntity } from '../entities/user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { EmailIsUnique } from '../validators/email-verificator.validator';
import { CpfIsUnique } from '../validators/cpf-verificator.validator';
import { IsOverEighteen } from '../validators/over-eighteen.validator';
import { CpfIsValid } from '../validators/cpf -is-valid';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vázio' })
  name: string;

  @IsEmail(undefined, { message: 'Email é inválido' })
  @EmailIsUnique({ message: 'Email  já cadastrado' }) //custom validator
  email: string;

  @IsNotEmpty({ message: 'Senha não pode ser vázia' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })
  password: string;

  @IsNotEmpty({ message: 'O CPF não pode ser vázio' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'Formato de CPF inválido, exemplo: 000.000.000-00',
  })
  @CpfIsUnique({ message: 'O cpf já foi cadastrado' })
  @CpfIsValid({ message: 'CPF inválido' })
  cpf: string;

  @IsOptional()
  cellNumber?: string;

  @IsOptional()
  address?: string;

  @IsNotEmpty({ message: 'Data de nascimento não pode ser inválida' })
  @IsOverEighteen({ message: 'É preciso ser maior de idade para se cadastrar' })
  dateBirthday: string;

  @IsNotEmpty({ message: 'Data de nascimento não pode ser inválida' })
  @IsString()
  userType: string;
}
