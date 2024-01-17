import { error, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, }) => {

    const res = await fetch(`http://api:${process.env.API_PORT}/transactions`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
    if (res.status !== 200) {
        error(500, {
            message: 'Error fetching transactions',
        });
    }
    const transactions = await res.json();
    transactions.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return { transactions: transactions };
}) satisfies PageServerLoad;

export const actions: Actions = {
    delete: async ({ request, locals }) => {
        const data = await request.formData()
        const res = await fetch(`http://api:${process.env.API_PORT}/transactions/${data.get("id")}`, { headers: { 'Authorization': `Bearer ${locals.token}` }, method: "DELETE" });
        if (res.status !== 200) {
            const json = await res.json();
            error(json.statusCode, {
                message: json.message,
            });


        }

    },

};