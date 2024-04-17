import {
  Controller,
  Get,
  UseInterceptors,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const createdProduct =
      await this.productsService.createProduct(productData);
    return createdProduct;
  }
  //Implementing method for upload images of images
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const fileData = files.map((file) => ({
      fileName: file.originalname,
      file: file.buffer,
    }));
    const signedUrls = await this.productsService.uploadImagesS3(fileData);
    return { urls: signedUrls };
  }
  @Get()
  @UseInterceptors(CacheInterceptor)
  async listAllProducts() {
    return await this.productsService.listAllProducts();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async searchUserById(@Param('id') id: string) {
    const possibleProduct = await this.productsService.searchById(id);
    if (!possibleProduct) {
      throw new Error(`No product found with ID "${id}"`);
    }
    return possibleProduct;
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() newData: UpdateProductDTO,
  ) {
    const updatedProduct = await this.productsService.updateProduct(
      id,
      newData,
    );
    return {
      message: 'Produto atualizado com sucesso',
      product: updatedProduct,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const deletedProduct = await this.productsService.deleteProduct(id);
    return {
      message: 'Produto removido com sucesso',
      product: deletedProduct,
    };
  }
}
