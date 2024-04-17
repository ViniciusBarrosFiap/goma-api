import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { OrderEntity } from './order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('order_itens')
export class OrderItensEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'quantity', nullable: false })
  quantity: number;
  @Column({ name: 'sale_price', nullable: false })
  salePrice: number;
  @ManyToOne(() => OrderEntity, (order) => order.orderItens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;
  @ManyToOne(() => ProductEntity, (product) => product.orderItens)
  product: ProductEntity;
}
