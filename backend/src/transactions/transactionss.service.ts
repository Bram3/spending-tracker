import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { UpdateTransactionDto } from './dto/updateTransaction.dto';
import { Transaction } from './entities/transaction.entity';


@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
    ) { }

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const transaction = this.transactionsRepository.create(createTransactionDto);
        return this.transactionsRepository.save(transaction);
    }

    async findAll(): Promise<Transaction[]> {
        return this.transactionsRepository.find({ relations: ["category", "supplier", "user"] });
    }

    async findOne(id: number): Promise<Transaction> {
        const transaction = await this.transactionsRepository.findOne({ where: { id: id }, relations: ["category", "supplier", "user"] });
        if (!transaction) {
            throw new NotFoundException(`Transaction not found`);
        }
        return transaction;
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
        const transaction = await this.transactionsRepository.preload({
            id: id,
            ...updateTransactionDto,
        });
        if (!transaction) {
            throw new NotFoundException(`Transaction  not found`);
        }
        return this.transactionsRepository.save(transaction);
    }

    async remove(id: number): Promise<void> {
        const result = await this.transactionsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Transaction not found`);
        }
    }
}