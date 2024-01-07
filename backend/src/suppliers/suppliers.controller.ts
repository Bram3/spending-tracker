import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/createSupplier.dto';
import { UpdateSupplierDto } from './dto/updateSupplier.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { CategoriesService } from 'src/categories/categories.service';

@UseGuards(JwtAuthGuard)
@Controller('suppliers')
export class SuppliersController {
    constructor(private readonly suppliersService: SuppliersService, private readonly categoriesService: CategoriesService) { }

    @Post()
    async create(@Body() createSupplierDto: CreateSupplierDto) {
        const category = await this.categoriesService.findOne(createSupplierDto.defaultCategoryId);
        if (!category) {
            throw new HttpException(
                "Category not found",
                HttpStatus.NOT_FOUND
            )
        }
        return await this.suppliersService.create(createSupplierDto);
    }

    @Get()
    async findAll() {
        return await this.suppliersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const supplier = await this.suppliersService.findOne(+id);
        if (!supplier) {
            throw new HttpException(
                "Supplier not found",
                HttpStatus.NOT_FOUND
            )
        }
        return supplier;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
        const supplier = await this.suppliersService.findOne(+id);
        if (!supplier) {
            throw new HttpException(
                "Supplier not found",
                HttpStatus.NOT_FOUND
            )
        }
        return await this.suppliersService.update(+id, updateSupplierDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const supplier = await this.suppliersService.findOne(+id);
        if (!supplier) {
            throw new HttpException(
                "Supplier not found",
                HttpStatus.NOT_FOUND
            )
        }
        if (await this.suppliersService.isUsed(+id)) {
            throw new BadRequestException("Supplier is used in a transaction");
        }
        return await this.suppliersService.remove(+id);
    }
}
