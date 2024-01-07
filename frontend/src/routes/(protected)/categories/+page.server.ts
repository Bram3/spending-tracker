import { error, type Actions, json, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { newCategorySchema } from '$lib/schema/newCategorySchema';
import { setError, setMessage, superValidate } from 'sveltekit-superforms/server';

export const load = (async ({ locals }) => {
    const res = await fetch(`http://api:${process.env.API_PORT}/categories`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
    if (res.status !== 200) {
        error(500, {
            message: 'Error fetching categories',
        });
    }
    const categories = await res.json();

    return { categories };
}) satisfies PageServerLoad;

export const actions: Actions = {
    delete: async ({ request, locals }) => {
        const data = await request.formData()
        const res = await fetch(`http://api:${process.env.API_PORT}/categories/${data.get("id")}`, { headers: { 'Authorization': `Bearer ${locals.token}` }, method: "DELETE" });
        if (res.status !== 200) {
            const json = await res.json();
            error(json.statusCode, {
                message: json.message,
            });


        }

    },

};
