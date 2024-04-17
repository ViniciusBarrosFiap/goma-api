import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/orderStatus.enum';

export class UpdateOrderDTO {
  @IsEnum(OrderStatus)
  status: string;
}
