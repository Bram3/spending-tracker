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
    @Get('total')
    async getTotalSpentPerCategory() {
        const transactions = await this.transactionsService.findAll();

        let categoryStats = [];
        let supplierStats = [];
        let paymentMethodStats = [];
        let combinedPaymentMethodStat = createNewStat("Gecombineerd", new Date().getFullYear());
        const currentYear = new Date().getFullYear();

        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i];
            const date = new Date(transaction.date);
            const year = date.getFullYear();
            const month = date.getMonth();

            // Calculate stats for categories
            let categoryStat = categoryStats.find(stat => stat.name === transaction.category.name);
            if (!categoryStat) {
                categoryStat = createNewStat(transaction.category.name, currentYear);
                categoryStats.push(categoryStat);
            }
            addTransactionToStat(categoryStat, year, month, transaction.amount);

            // Calculate stats for suppliers
            let supplierStat = supplierStats.find(stat => stat.name === transaction.supplier.name);
            if (!supplierStat) {
                supplierStat = createNewStat(transaction.supplier.name, currentYear);
                supplierStats.push(supplierStat);
            }
            addTransactionToStat(supplierStat, year, month, transaction.amount);

            // Calculate stats for payment methods
            let paymentMethodStat = paymentMethodStats.find(stat => stat.name === transaction.paymentMethod);
            if (!paymentMethodStat) {
                paymentMethodStat = createNewStat(transaction.paymentMethod, currentYear);
                paymentMethodStats.push(paymentMethodStat);
            }
            addTransactionToStat(paymentMethodStat, year, month, transaction.amount);

            addTransactionToStat(combinedPaymentMethodStat, year, month, transaction.amount);
        }
        paymentMethodStats.push(combinedPaymentMethodStat);

        return {
            categoryStats,
            supplierStats,
            paymentMethodStats
        };
    }


}

function createNewStat(name: string, currentYear: number) {
    return {
        name: name,
        thisYear: {
            year: currentYear,
            total: 0,
            months: Array(12).fill(0),
        },
        lastYear: {
            year: currentYear - 1,
            total: 0,
            months: Array(12).fill(0),
        },
        yearBeforeLastYear: {
            year: currentYear - 2,
            total: 0,
            months: Array(12).fill(0),
        },
    };
}

function addTransactionToStat(stat: any, year: number, month: number, amount: number) {
    if (year === stat.thisYear.year) {
        stat.thisYear.total += Number(amount);
        stat.thisYear.months[month] += Number(amount);
    } else if (year === stat.lastYear.year) {
        stat.lastYear.total += Number(amount);
        stat.lastYear.months[month] += Number(amount);
    } else if (year === stat.yearBeforeLastYear.year) {
        stat.yearBeforeLastYear.total += Number(amount);
        stat.yearBeforeLastYear.months[month] += Number(amount);
    }
}