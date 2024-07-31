import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/create-products';
import { UpdateProductDto } from './dto/update-products';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) 
        private productRepository: Repository<Product>
    ){}

    async all(): Promise<Product[]>{
        return await this.productRepository.find()
    }

    async create(createProductsDto: CreateProductsDto): Promise<Product> {
        return await this.productRepository.save(createProductsDto)
    }

    async getOne(id: number): Promise<Product>{
        const product = await this.productRepository.findOne({where: {id: id}})
        return product
    }

    async update(id: number, updateProduuctDto: UpdateProductDto): Promise<Product> {
        await this.productRepository.update(id, updateProduuctDto)
        return this.getOne(id)
    }

    async delete(id: number){
        return this.productRepository.delete(id);
    }
}
