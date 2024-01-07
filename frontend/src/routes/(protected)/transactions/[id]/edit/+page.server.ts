import { newTransactionSchema } from '$lib/schema/newTransactionSchema';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { setMessage, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    const newForm = await superValidate(newTransactionSchema);

    const categoriesRes = await fetch(`http://api:${process.env.API_PORT}/categories`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
    if (categoriesRes.status !== 200) {
        error(500, {
            message: 'Error fetching categories',
        });
    }
    const categories = await categoriesRes.json();
    const suppliersRes = await fetch(`http://api:${process.env.API_PORT}/suppliers`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
    if (suppliersRes.status !== 200) {
        error(500, {
            message: 'Error fetching suppliers',
        });
    }
    const suppliers = await suppliersRes.json();

    const transactionRes = await fetch(`http://api:${process.env.API_PORT}/transactions/${params.id}`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
    if (transactionRes.status !== 200) {
        error(500, {
            message: 'Error fetching transactions',
        });
    }
    const transaction = await transactionRes.json();
    newForm.data.amount = transaction.amount;
    newForm.data.description = transaction.description;
    newForm.data.supplierId = transaction.supplierId;
    newForm.data.categoryId = transaction.categoryId;
    newForm.data.date = transaction.date;
    newForm.data.paymentMethod = transaction.paymentMethod;
    return { newForm, categories, suppliers, transaction: transaction };
}) satisfies PageServerLoad;

export const actions: Actions = {

    edit: async ({ params, request, locals, }) => {
        const form = await superValidate(request, newTransactionSchema);

        if (!form.valid) {
            return fail(400, { form });
        }
        const res = await fetch(`http://api:${process.env.API_PORT}/transactions/${params.id}`, { headers: { 'Authorization': `Bearer ${locals.token}`, "Content-Type": "application/json" }, method: "PATCH", body: JSON.stringify({ ...form.data }), });
        if (res.status !== 200) {
            try {
                const json = await res.json();
                return setMessage(form,
                    json.message,
                );
            } catch (e) {
                console.error(e);
                return setMessage(form,
                    'Error updating transaction',
                );
            }

        }
        throw redirect(302, '/transactions')
    }
};

