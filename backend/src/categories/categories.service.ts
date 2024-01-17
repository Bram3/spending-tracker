import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Supplier)
        private supplierRepository: Repository<Supplier>,
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
    ) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find({
            order: {
                name: 'ASC', // Sort by 'name' in ascending order
            },
        });
    }

    async existsByName(name: string): Promise<boolean> {
        const category = await this.categoryRepository.findOneBy({ name });
        return !!category;
    }

    async findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOneBy({ id });
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        await this.categoryRepository.update(id, updateCategoryDto);
        return this.categoryRepository.findOneBy({ id });
    }

    async isUsed(id: number): Promise<boolean> {
        const suppliers = await this.supplierRepository.find({ where: { defaultCategoryId: id } });
        const transactionss = await this.transactionsRepository.find({ where: { categoryId: id } });
        return suppliers.length > 0 || transactionss.length > 0;
    }

    async remove(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}
