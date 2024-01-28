import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [ TransactionsModule],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
