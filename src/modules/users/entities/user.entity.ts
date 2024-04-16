import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  // Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
// import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
// import { EmailIsUnique } from '../validators/email-verificator.validator';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  // @IsNotEmpty({ message: 'O nome não pode ser vázio' })
  name: string;

  @Column({ name: 'email', length: 70, nullable: false })
  // @IsEmail(undefined, { message: 'Email é inválido' })
  // @EmailIsUnique({ message: 'Email  já cadastrado' }) //custom validator
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  // @IsNotEmpty({ message: 'Senha não pode ser vázia' })
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,30}$/, {
  //   message:
  //     'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  // })
  @Exclude()
  password: string;

  @Column({ name: 'cpf', length: 14, nullable: false })
  // @IsNotEmpty({ message: 'O CPF não pode ser vázio' })
  // @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
  //   message: 'Formato de CPF inválido, exemplo: 000.000.000-00',
  // })
  cpf: string;

  @Column({ name: 'cell_number', length: 15, nullable: true }) // Tornando a propriedade opcional
  // @IsOptional()
  cellNumber?: string;

  @Column({ name: 'address', length: 100, nullable: true }) // Tornando a propriedade opcional
  // @IsOptional()
  address?: string;

  @Column({ name: 'date_birthday', length: 10, nullable: false })
  // @IsNotEmpty({ message: 'Data de nascimento não pode ser inválida' })
  dateBirthday: string;

  @Column({ name: 'gender', nullable: true }) // Tornando a propriedade opcional
  // @IsOptional()
  gender?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
