import { error, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url}) => {

    let queryParams = new URLSearchParams();

    const paymentMethod = url.searchParams.get('paymentMethod');
    const category = url.searchParams.get('category');
    const supplier = url.searchParams.get('supplier');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    if (paymentMethod) queryParams.append('paymentMethod', paymentMethod);
    if (category) queryParams.append('category', category);
    if (supplier) queryParams.append('supplier', supplier);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);

    const res = await fetch(`http://api:${process.env.API_PORT}/transactions/filter?${queryParams.toString()}`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
    if (res.status !== 200) {
        error(500, {
            message: 'Error fetching transactions',
        });
    }
    const transactions = await res.json();
    transactions.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let total = 0;
    transactions.forEach((transaction: { amount: number; }) => {
        total += Number(transaction.amount);
    });

    return { transactions: transactions, total: total};
}) satisfies PageServerLoad;
