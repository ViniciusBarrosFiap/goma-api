import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
// import { UpdateProductDTO } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
// import { UserEntity } from '../users/entities/user.entity';
import { ListProductsDTO } from './dto/listProducts.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}
  async listAllProducts() {
    const allProducts = await this.productRepository.find({
      relations: {
        images: true,
        characteristics: true,
      },
    });
    const productList = allProducts.map(
      (product) =>
        new ListProductsDTO(
          product.id,
          product.name,
          product.brand,
          product.price,
          product.characteristics,
          product.images,
        ),
    );
    return productList;
  }
  async createProduct(productData: CreateProductDTO) {
    const productEntity = new ProductEntity();
    Object.assign(productEntity, productData as unknown as ProductEntity);
    return this.productRepository.save(productEntity);
  }
}
