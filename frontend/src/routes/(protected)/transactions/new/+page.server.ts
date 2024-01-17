import { setMessage, superValidate } from 'sveltekit-superforms/server';
import { newTransactionSchema } from '$lib/schema/newTransactionSchema';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { newCategorySchema } from '$lib/schema/newCategorySchema';
import type { PageServerLoad } from '../$types';

export const load = (async ({ locals }) => {
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

    return { newForm, categories, suppliers };
}) satisfies PageServerLoad;

export const actions: Actions = {

    new: async ({ params, request, locals, }) => {
        const formData = await request.formData()
        const form = await superValidate(formData, newTransactionSchema);

        if (!form.valid) {
            return fail(400, { form });
        }
        const userRes = await fetch(`http://api:${process.env.API_PORT}/users/me`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
        if (userRes.status !== 200) {
            return fail(500, { form });
        }
        const user = await userRes.json();
        const res = await fetch(`http://api:${process.env.API_PORT}/transactions`, { headers: { 'Authorization': `Bearer ${locals.token}`, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ userId: user.id, ...form.data }), });
        if (res.status !== 201) {
            try {
                const json = await res.json();
                return setMessage(form,
                    json.message,
                );
            } catch (e) {
                console.error(e);
                return setMessage(form,
                    'Error creating transaction',
                );
            }

        }
        const files = formData.getAll('files');
        console.log(files);
        if (files) {
            const transaction = await res.json();
            const data = new FormData();
            files.forEach(file => {
                data.append('files', file);
            })
            const filesRes = await fetch(`http://api:${process.env.API_PORT}/transactions/${transaction.id}/attachments`, { headers: { 'Authorization': `Bearer ${locals.token}` }, method: "POST", body: data });
            if (filesRes.status !== 201) {
                try {
                    const json = await res.json();
                    return setMessage(form,
                        json.message,
                    );
                } catch (e) {
                    console.error(e);
                    return setMessage(form,
                        'Error uploading attachments',
                    );
                }
            }
        }

        throw redirect(302, '/transactions')
    }
};

