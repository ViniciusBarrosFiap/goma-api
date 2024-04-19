import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  @Exclude()
  password: string;

  @Column({ name: 'cpf', length: 14, nullable: false })
  cpf: string;

  @Column({ name: 'cell_number', length: 15, nullable: true }) // Tornando a propriedade opcional
  cellNumber?: string;

  @Column({ name: 'address', length: 100, nullable: true }) // Tornando a propriedade opcional
  address?: string;

  @Column({ name: 'date_birthday', length: 10, nullable: false })
  dateBirthday: string;

  @Column({ name: 'user_type', nullable: false })
  userType: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
