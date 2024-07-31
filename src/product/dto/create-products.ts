import { IsNotEmpty, IsString } from "class-validator";


export class CreateProductsDto {
    @IsNotEmpty()
    @IsString()
    title: string
}