import { ProductsCharacteristicsEntity } from './product-characteristics.entity';
import { ProductsImagesEntity } from './products-images.entity';

export class ProductEntity {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantityAvaliable: number;
  category: string;
  characteristics: ProductsCharacteristicsEntity[];
  images: ProductsImagesEntity[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
