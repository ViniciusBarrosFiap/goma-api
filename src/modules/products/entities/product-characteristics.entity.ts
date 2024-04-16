import { ProductEntity } from './product.entity';

export class ProductsCharacteristicsEntity {
  id: string;
  name: string;
  description: string;
  product: ProductEntity;
}
