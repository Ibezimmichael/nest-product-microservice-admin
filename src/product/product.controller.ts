import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductsDto } from './dto/create-products';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-products';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateLikesDto } from './dto/update-likes';

@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
    ){}

    @Get()
    async all() {
        return await this.productService.all();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(
        @Body(ValidationPipe) createProductsDto: CreateProductsDto
    ): Promise<Product> {
        const product = await this.productService.create(createProductsDto)
        this.client.emit('product_created', product)
        return product
    }

    @Get('/:id')
    async getOne(
        @Param('id', ParseIntPipe)id : number,
    ): Promise<Product> {
        return await this.productService.getOne(id)
    }

    @Put('/:id')
    async update(
        @Param('id', ParseIntPipe)id: number,
        @Body(ValidationPipe) updateProductDto: UpdateProductDto
    ): Promise<Product> {
        await this.productService.update(id, updateProductDto);
        const product = await this.productService.getOne(id);
        this.client.emit('product_updated', product)
        return product
    }

    @Delete('/:id')
    async delete(
        @Param('id', ParseIntPipe)id: number
    ) {
        await this.productService.delete(id)
        this.client.emit('product_deleted', id)
    }

    @Post('/:id/like')
    async like(
        @Param('id', ParseIntPipe) id: number,
    ) {
        const product = await this.productService.getOne(id);
        if (product) {
            const updateLikesDto: UpdateLikesDto = { likes: product.likes + 1 };
            await this.productService.update(id, updateLikesDto);
            return product;
        }
    }
}
