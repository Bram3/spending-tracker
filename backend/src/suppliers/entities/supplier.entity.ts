import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToOne(() => Category, { nullable: false, eager: false })
    defaultCategory: Category;

    @Column()
    @RelationId((supplier: Supplier) => supplier.defaultCategory)
    defaultCategoryId: number;
}
