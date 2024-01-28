import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CategoriesModule } from './categories/categories.module';
import { User } from './users/entities/user.entity';
import { Supplier } from './suppliers/entities/supplier.entity';
import { Category } from './categories/entities/category.entity';
import { Transaction } from 'typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { Attachment } from './attachments/entities/attachment.entity';
import { AttachmentsModule } from './attachments/attachments.module';
import { StatsModule } from './stats/stats.module';
@Module({
  imports: [ConfigModule.forRoot({ validationSchema: configValidationSchema }), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [User, Supplier, Category, Transaction, Attachment],
      };
    },
  }), UsersModule, AuthModule, SuppliersModule, CategoriesModule, TransactionsModule, AttachmentsModule, StatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}