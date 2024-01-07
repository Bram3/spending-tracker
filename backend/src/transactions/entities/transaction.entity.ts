import { Category } from 'src/categories/entities/category.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Category, { nullable: false, eager: false })
    category: Category;

    @Column()
    @RelationId((transaction: Transaction) => transaction.category)
    categoryId: number;


    @ManyToOne(() => Supplier, { nullable: false, eager: false })
    supplier: Supplier;

    @Column()
    @RelationId((transaction: Transaction) => transaction.supplier)
    supplierId: number;

    @Column()
    date: Date;

    @Column()
    description: string;

    @Column('decimal')
    amount: number;

    @Column()
    paymentMethod: string;


    @ManyToOne(() => User, { nullable: false, eager: false })
    user: User;

    @Column()
    @RelationId((transaction: Transaction) => transaction.user)
    userId: number;
}
