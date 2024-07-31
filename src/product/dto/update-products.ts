import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    likes?: number;
}