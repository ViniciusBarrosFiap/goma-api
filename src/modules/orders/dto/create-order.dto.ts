import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class OrderItensDTO {
  @IsUUID()
  productId: string;
  @IsInt()
  quantity: number;
}
export class CreateOrderDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OrderItensDTO)
  orderItens: OrderItensDTO[];
}
