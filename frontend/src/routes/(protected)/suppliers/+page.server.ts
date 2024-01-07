import { error, type Actions, json, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { newCategorySchema } from '$lib/schema/newCategorySchema';
import { setError, setMessage, superValidate } from 'sveltekit-superforms/server';

export const load = (async ({ locals }) => {
    const res = await fetch(`http://api:${process.env.API_PORT}/suppliers`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
    if (res.status !== 200) {
        error(500, {
            message: 'Error fetching suppliers',
        });
    }
    const suppliers = await res.json();

    return { suppliers };
}) satisfies PageServerLoad;

export const actions: Actions = {
    delete: async ({ request, locals }) => {
        const data = await request.formData()
        const res = await fetch(`http://api:${process.env.API_PORT}/suppliers/${data.get("id")}`, { headers: { 'Authorization': `Bearer ${locals.token}` }, method: "DELETE" });
        if (res.status !== 200) {
            const json = await res.json();
            error(json.statusCode, {
                message: json.message,
            });


        }

    },

};
