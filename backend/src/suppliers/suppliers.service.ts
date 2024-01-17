import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { UpdateSupplierDto } from './dto/updateSupplier.dto';
import { CreateSupplierDto } from './dto/createSupplier.dto';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Injectable()
export class SuppliersService {
    constructor(
        @InjectRepository(Supplier)
        private supplierRepository: Repository<Supplier>,
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
    ) { }

    async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
        const supplier = this.supplierRepository.create(createSupplierDto);
        return this.supplierRepository.save(supplier);
    }

    async findAll(): Promise<Supplier[]> {
        return this.supplierRepository.find({
            relations: ["defaultCategory"], order: {
                name: 'ASC', // Sort by 'name' in ascending order
            },
        });
    }

    async findOne(id: number): Promise<Supplier> {
        return this.supplierRepository.findOne({ where: { id: id }, relations: ["defaultCategory"] });
    }

    async isUsed(id: number): Promise<boolean> {
        const transactions = await this.transactionsRepository.find({ where: { supplierId: id } });
        return transactions.length > 0;
    }

    async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
        await this.supplierRepository.update(id, updateSupplierDto);
        return this.supplierRepository.findOne({ where: { id: id }, relations: ["defaultCategory"] });
    }

    async remove(id: number): Promise<void> {
        await this.supplierRepository.delete(id);
    }
}
