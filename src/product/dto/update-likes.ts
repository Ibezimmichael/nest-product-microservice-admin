import { IsInt, IsOptional, Min } from "class-validator";


export class UpdateLikesDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    likes?: number;    
}