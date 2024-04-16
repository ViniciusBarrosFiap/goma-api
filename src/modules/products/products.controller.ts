import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
// import { CreateProductDTO } from './dto/create-product.dto';
// import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDTO) {
  //   return this.productsService.create(createProductDto);
  // }

  @Get()
  async listAllProducts() {
    return await this.productsService.listAllProducts();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDTO) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}