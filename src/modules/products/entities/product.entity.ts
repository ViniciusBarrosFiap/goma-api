import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductsCharacteristicsEntity } from './productCharacteristics.entity';
import { ProductsImagesEntity } from './productsImages.entity';
import { OrderItensEntity } from '../../orders/entities/orderItens.entity';
@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', length: 50, nullable: false })
  name: string;
  @Column({ name: 'brand', length: 50, nullable: false })
  brand: string;
  @Column({ name: 'price', nullable: false })
  price: number;
  @Column({ name: 'quantityAvlb', nullable: false })
  quantityAvaliable: number;
  @Column({ name: 'category', length: 50, nullable: false })
  category: string;

  @OneToMany(
    () => ProductsCharacteristicsEntity,
    (productsCharacteristicsEntity) => productsCharacteristicsEntity.product,
    { cascade: true, eager: true },
  )
  characteristics: ProductsCharacteristicsEntity[];

  @OneToMany(
    () => ProductsImagesEntity,
    (productsImagesEntity) => productsImagesEntity.product,
    { cascade: true, eager: true },
  )
  images: ProductsImagesEntity[];
  @OneToMany(() => OrderItensEntity, (orderItens) => orderItens.product)
  orderItens: OrderItensEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
