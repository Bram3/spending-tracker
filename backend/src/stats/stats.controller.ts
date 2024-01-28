import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { TransactionsService } from 'src/transactions/transactions.service';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
    constructor(private readonly transactionsService: TransactionsService) { }
    @Get('totalSpent')
    async getTotalSpent() {
        const transactions = await this.transactionsService.findAll();
        
        let totalSpent = 0;
        for (let i = 0; i < transactions.length; i++) {
            totalSpent += Number(transactions[i].amount);
        }
        return { totalSpent };
    }
}
