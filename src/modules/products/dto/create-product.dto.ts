import { ProductEntity } from '../entities/product.entity';

export class ProductsCharacteristicsDTO {
  id: string;
  name: string;
  description: string;
  product: ProductEntity;
}

export class ProductImagesDTO {
  id: string;
  url: string;
  alt: string;
  product: ProductEntity;
}
export class CreateProductDTO {
  name: string;
  brand: string;
  price: string;
  category: string;
  quantityAvaliable: number;
  description: string;
  characteristics: ProductsCharacteristicsDTO[];
  images: ProductImagesDTO[];
}
