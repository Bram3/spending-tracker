import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { UpdateTransactionDto } from './dto/updateTransaction.dto';
import { Transaction } from './entities/transaction.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';


@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        @InjectRepository(Attachment)
        private attachmentsRepository: Repository<Attachment>,
    ) { }

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const transaction = this.transactionsRepository.create(createTransactionDto);
        return this.transactionsRepository.save(transaction);
    }

    async findAll(): Promise<Transaction[]> {
        return this.transactionsRepository.find({ relations: ["category", "supplier", "user", "attachments"] });
    }

    async findOne(id: number): Promise<Transaction> {
        const transaction = await this.transactionsRepository.findOne({ where: { id: id }, relations: ["category", "supplier", "user", "attachments"] });
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
            throw new NotFoundException(`Transaction not found`);
        }
        return this.transactionsRepository.save(transaction);
    }

    async remove(id: number): Promise<void> {
        const result = await this.transactionsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Transaction not found`);
        }
    }

    async upload(id: number, files: Express.Multer.File[]) {
        const transaction = await this.findOne(id);
        if (!transaction) {
            throw new NotFoundException(`Transaction not found`);
        }

        files.forEach(file => {
            const attachment = {
                path: file.path,
                originalname: file.originalname,
                transactionId: transaction.id,
                contentType: file.mimetype
            }
            this.attachmentsRepository.save(attachment);
        })

    }

    async getAttachments(id: number) {
        const transaction = await this.findOne(id);
        if (!transaction) {
            throw new NotFoundException(`Transaction not found`);
        }
        return this.attachmentsRepository.find({ where: { transactionId: transaction.id } });
    }

    async deleteAttachment(id: number, attachmentId: number) {
        const transaction = await this.findOne(id);
        if (!transaction) {
            throw new NotFoundException(`Transaction not found`);
        }
        const attachment = await this.attachmentsRepository.findOne({ where: { id: attachmentId } });
        if (!attachment) {
            throw new NotFoundException(`Attachment not found`);
        }
        await this.attachmentsRepository.delete(attachmentId);
    }

}