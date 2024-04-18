import { Controller, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
@UseGuards(GuardAuthention)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
}
