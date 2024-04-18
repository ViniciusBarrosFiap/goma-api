import { IsEmail, IsNotEmpty } from 'class-validator';

//Propriedades que serão recebidas no momento do login

export class AuthDTO {
  @IsEmail(undefined, { message: 'O email informado é inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vázia' })
  password: string;
}
