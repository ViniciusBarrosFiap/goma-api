import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  AuthenticationGuard,
  RequestWithUser,
} from '../authentication/authentication.guard';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { UserType } from '../users/enum/user-type.enum';
@UseGuards(AuthenticationGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(UserType.User)
  async getOrderFromUser(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    const orders = await this.ordersService.getOrderOfUser(userId);
    return orders;
  }
  @Post()
  @Roles(UserType.User)
  async createOrder(
    @Req() req: RequestWithUser,
    @Body() orderData: CreateOrderDTO,
  ) {
    const userId = req.user.sub;
    const createdOrder = await this.ordersService.createOrder(
      userId,
      orderData,
    );

    return {
      message: 'Pedido criado com sucesso',
      order: createdOrder,
    };
  }

  @Post(':id')
  @Roles(UserType.User)
  async updateOrder(
    @Req() req: RequestWithUser,
    @Param('id') orderId: string,
    @Body() newOrderData: UpdateOrderDTO,
  ) {
    const userId = req.user.sub;
    const updatedOrder = await this.ordersService.updateOrder(
      orderId,
      newOrderData,
      userId,
    );
    return updatedOrder;
  }
}
