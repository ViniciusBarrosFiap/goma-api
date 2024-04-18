import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from '../users/entities/user.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrderStatus } from './enum/orderStatus.enum';
import { OrderItensEntity } from './entities/orderItens.entity';
import { UpdateOrderDTO } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  private async searchUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (user == null) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  private handleOrderData(
    orderData: CreateOrderDTO,
    relatedProduts: ProductEntity[],
  ) {
    orderData.orderItens.forEach((orderItem) => {
      const relatedProduct = relatedProduts.find(
        (product) => product.id === orderItem.productId,
      );

      if (relatedProduct === undefined) {
        throw new NotFoundException(
          `O produto com id ${orderItem.productId} não foi encontrado`,
        );
      }
      if (orderItem.quantity > relatedProduct.quantityAvaliable) {
        throw new BadRequestException(
          `A quantidade solicitada(${orderItem.quantity}) é superior do que a disponivel (${relatedProduct.quantityAvaliable}) para o produto ${relatedProduct.name}.`,
        );
      }
    });
  }
  async createOrder(id: string, orderData: CreateOrderDTO) {
    const user = await this.searchUser(id);
    const idProducts = orderData.orderItens.map(
      (orderItem) => orderItem.productId,
    );
    const relatedProducts = await this.productRepository.findBy({
      id: In(idProducts),
    });
    const orderEntity = new OrderEntity();

    orderEntity.status = OrderStatus.PENDING;
    orderEntity.user = user;

    this.handleOrderData(orderData, relatedProducts);

    const orderItensEntities = orderData.orderItens.map((orderItem) => {
      const relatedProduct = relatedProducts.find(
        (product) => product.id === orderItem.productId,
      );
      const orderItemEntity = new OrderItensEntity();
      orderItemEntity.product = relatedProduct!;
      orderItemEntity.salePrice = relatedProduct!.price;
      orderItemEntity.quantity = orderItem.quantity;
      orderItemEntity.product.quantityAvaliable -= orderItem.quantity;
      return orderItemEntity;
    });
    const amount = orderItensEntities.reduce((total, item) => {
      return total + item.salePrice * item.quantity;
    }, 0);

    orderEntity.orderItens = orderItensEntities;
    orderEntity.amount = amount;

    const createdOrder = await this.orderRepository.save(orderEntity);
    return createdOrder;
  }
  async getOrderOfUser(id: string) {
    await this.searchUser(id);
    return this.orderRepository.find({
      where: {
        user: { id: id },
      },
      relations: {
        user: true,
      },
    });
  }
  async updateOrder(id: string, dto: UpdateOrderDTO, userId: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (order === null) {
      throw new NotFoundException('O pedido não foi encontrado');
    }
    if (order.user.id !== userId) {
      throw new ForbiddenException(
        'Você não tem autorização para atualizar esse pedido',
      );
    }
    Object.assign(order, dto as OrderEntity);
    return this.orderRepository.save(order);
  }
}
