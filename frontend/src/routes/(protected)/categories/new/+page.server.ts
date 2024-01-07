import { newCategorySchema } from '$lib/schema/newCategorySchema';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import { superValidate, setMessage } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../$types';

export const load = (async () => {
    const newForm = await superValidate(newCategorySchema);

    return { newForm };
}) satisfies PageServerLoad;

export const actions: Actions = {

    new: async ({ params, request, locals }) => {
        const form = await superValidate(request, newCategorySchema);

        if (!form.valid) {
            return fail(400, { form });
        }
        const res = await fetch(`http://api:${process.env.API_PORT}/categories`, { headers: { 'Authorization': `Bearer ${locals.token}`, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ name: form.data.name }), });
        if (res.status !== 201) {
            try {
                const json = await res.json();
                return setMessage(form,
                    json.message,
                );
            } catch (e) {
                console.error(e);
                return setMessage(form,
                    'Error creating category',
                );
            }

        }
        throw redirect(302, '/categories')
    }
};
