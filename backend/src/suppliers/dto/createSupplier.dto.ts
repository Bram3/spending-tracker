import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    // Assuming 'categoryId' is used to set the category during creation
    @IsNotEmpty()
    defaultCategoryId: number;
}