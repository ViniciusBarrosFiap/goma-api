import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductEntity } from '../entities/product.entity';
import { Type } from 'class-transformer';

export class ProductsCharacteristicsDTO {
  id: string;
  @IsString()
  @IsNotEmpty({ message: 'O nome da caracteristica não pode ser vázio' })
  name: string;
  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vázia' })
  description: string;
  product: ProductEntity;
}

export class ProductImagesDTO {
  id: string;
  @IsUrl()
  url: string;
  @IsString()
  @IsNotEmpty({ message: 'O alt não pode ser vázio' })
  @IsOptional()
  alt?: string;
  product: ProductEntity;
}
export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vázio' })
  name: string;
  @IsString()
  @IsNotEmpty({ message: 'Marca não pode ser vázio' })
  brand: string;
  @IsNumber()
  @IsNotEmpty({ message: 'Preço não pode ser vázio' })
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  price: number;
  @IsString()
  @IsNotEmpty({ message: 'Categoria não pode ser vázio' })
  category: string;
  @IsNumber()
  @IsNotEmpty({ message: 'Quantidade disponível não pode ser vázio' })
  @Min(1, { message: 'Quantidade disponível inválida' })
  quantityAvaliable: number;
  @IsString()
  @IsNotEmpty({ message: 'Descrição não pode ser vázio' })
  @MaxLength(1000, {
    message: 'A descrição não pode ter mais de 1000 caracteres',
  })
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductsCharacteristicsDTO)
  characteristics: ProductsCharacteristicsDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductImagesDTO)
  images: ProductImagesDTO[];
}
