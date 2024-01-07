import { CategoriesService } from './categories.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService,
    ) { }

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        if (await this.categoriesService.existsByName(createCategoryDto.name)) {
            throw new BadRequestException("Category already exists");
        }
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const category = await this.categoriesService.findOne(+id);
        if (!category) {
            throw new BadRequestException("Category not found");
        }
        return this.categoriesService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoriesService.findOne(+id);
        if (!category) {
            throw new BadRequestException("Category not found");
        }
        return this.categoriesService.update(+id, updateCategoryDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {

        const category = await this.categoriesService.findOne(+id);
        if (!category) {
            throw new BadRequestException("Category not found");
        }
        if (await this.categoriesService.isUsed(+id)) {
            throw new BadRequestException("Category is used by a supplier or in a transaction");
        }
        return this.categoriesService.remove(+id);
    }
}
