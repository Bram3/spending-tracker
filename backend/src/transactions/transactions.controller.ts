import { Body, Controller, Delete, Get, Param, Patch, Post, Query, StreamableFile, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { UpdateTransactionDto } from './dto/updateTransaction.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream } from 'fs';
import { Transaction } from './entities/transaction.entity';
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }
    @Get('filter')
    async filter(
      @Query('startDate') startDate: string,
      @Query('endDate') endDate: string,
      @Query('category') category: string,
      @Query('supplier') supplier: string,
      @Query('paymentMethod') paymentMethod: string,
    ): Promise<Transaction[]> {
      return await this.transactionsService.filter(
        startDate,
        endDate,
        category,
        supplier,
        paymentMethod,
      );
    }
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

    @Post(':id/attachments')
    @UseInterceptors(FilesInterceptor('files', 20, {
        storage: diskStorage({
            destination: "/app/uploads"
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async upload(@Param("id") id: string, @UploadedFiles() files) {
        console.log(files)
        return this.transactionsService.upload(+id, files)
    }

    @Get(':id/attachments')
    async getAttachments(@Param("id") id: string) {
        return this.transactionsService.getAttachments(+id)
    }



}
