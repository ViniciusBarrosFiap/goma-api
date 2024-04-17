import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product_images' })
export class ProductsImagesEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ name: 'url', length: 100, nullable: false })
  url: string;
  @Column({ name: 'alt', length: 100, nullable: true })
  alt?: string;
  @ManyToOne(() => ProductEntity, (product) => product.images, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}
