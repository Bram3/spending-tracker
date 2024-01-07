import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactionss.service';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { UpdateTransactionDto } from './dto/updateTransaction.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.create(createTransactionDto);
    }

    @Get()
    findAll() {
        return this.transactionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionsService.update(+id, updateTransactionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.transactionsService.remove(+id);
    }
}
