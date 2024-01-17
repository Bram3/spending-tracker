import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from 'src/attachments/entities/attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Attachment])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule { }
