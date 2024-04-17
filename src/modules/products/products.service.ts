import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ListProductsDTO } from './dto/listProducts.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
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
  async searchById(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Produto com ${id} não foi encontrado`);
    }
    return product;
  }
  async updateProduct(id: string, newData: UpdateProductDTO) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });
      if (product === null) {
        throw new NotFoundException(`Product com ID ${id} não foi encontrado`);
      }
      Object.assign(product, newData);
      return this.productRepository.save(product);
    } catch (error) {
      throw new NotFoundException(`Product with ID "${id}" não foi encontrado`);
    }
  }
  async deleteProduct(id: string) {
    const results = await this.productRepository.delete(id);
    if (!results.affected) {
      throw new NotFoundException(`Product with ID "${id}" não foi encontrado`);
    }
  }
}
