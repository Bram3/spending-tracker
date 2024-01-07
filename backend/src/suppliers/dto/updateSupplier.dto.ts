import { IsOptional, IsString } from 'class-validator';
export class UpdateSupplierDto {
    @IsOptional()
    @IsString()
    name?: string;

    // Optional as not all updates may involve changing the category
    @IsOptional()
    defaultCategoryId?: number;
}