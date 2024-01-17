import { Category } from 'src/categories/entities/category.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity()
export class Attachment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Transaction, { nullable: false, eager: false })
    transaction: Transaction;

    @Column()
    @RelationId((attachment: Attachment) => attachment.transaction)
    transactionId: number;

    @Column()
    path: string;

    @Column()
    originalname: string;

    @Column()
    contentType: string;
}
