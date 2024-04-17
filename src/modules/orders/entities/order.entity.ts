import { UserEntity } from 'src/modules/users/entities/user.entity';
import { OrderStatus } from '../enum/orderStatus.enum';
import { OrderItensEntity } from './orderItens.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'amount', nullable: false })
  amount: number;
  @Column({ name: 'status', nullable: false })
  status: OrderStatus;
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
  @OneToMany(() => OrderItensEntity, (orderItens) => orderItens.order, {
    cascade: true,
  })
  orderItens: OrderItensEntity;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
  @DeleteDateColumn()
  deletedAt: string;
}
