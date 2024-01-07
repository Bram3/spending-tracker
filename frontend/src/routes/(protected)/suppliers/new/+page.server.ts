import { newCategorySchema } from '$lib/schema/newCategorySchema';
import { type Actions, fail, redirect, error } from '@sveltejs/kit';
import { superValidate, setMessage } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../$types';
import { newSupplierSchema } from '$lib/schema/newSupplierSchema';

export const load = (async ({ locals }) => {
    const newForm = await superValidate(newSupplierSchema);
    const res = await fetch(`http://api:${process.env.API_PORT}/categories`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
    if (res.status !== 200) {
        error(500, {
            message: 'Error fetching categories',
        });
    }
    const categories = await res.json();
    return { newForm, categories };
}) satisfies PageServerLoad;

export const actions: Actions = {

    new: async ({ params, request, locals }) => {
        const form = await superValidate(request, newSupplierSchema);

        if (!form.valid) {
            return fail(400, { form });
        }
        const res = await fetch(`http://api:${process.env.API_PORT}/suppliers`, { headers: { 'Authorization': `Bearer ${locals.token}`, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(form.data), });
        if (res.status !== 201) {
            try {
                const json = await res.json();
                return setMessage(form,
                    json.message,
                );
            } catch (e) {
                console.error(e);
                return setMessage(form,
                    'Error creating supplier',
                );
            }

        }
        throw redirect(302, '/suppliers')
    }
};
