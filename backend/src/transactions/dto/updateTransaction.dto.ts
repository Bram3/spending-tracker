export class UpdateTransactionDto {
    readonly name?: string;
    readonly categoryId?: number;
    readonly supplierId?: number;
    readonly date?: Date;
    readonly description?: string;
    readonly amount?: number;
    readonly paymentMethod?: string;
    readonly userId?: number;
}