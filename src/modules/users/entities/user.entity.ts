import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty({ message: 'O nome não pode ser vázio' })
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @IsEmail(undefined, { message: 'Email é inválido' })
  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Exclude()
  @IsNotEmpty({ message: 'Senha não pode ser vázia' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @IsNotEmpty({ message: 'O CPF não pode ser vázio' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'Formato de CPF inválido, exemplo: 000.000.000-00',
  })
  @Column({ name: 'cpf', length: 11, nullable: false })
  cpf: string;

  @Column({ name: 'cell_number', length: 15, nullable: false })
  cellNumber?: string;

  @Column({ name: 'address', length: 100, nullable: false })
  address?: string;
  @IsNotEmpty({ message: 'Data de nascimento não pode ser inválida' })
  @Column({ name: 'date_birthday', length: 10, nullable: false })
  dateBirthday: string;

  @Column({ name: 'gender', nullable: false })
  gender?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
