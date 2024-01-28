import { error, type Actions, json, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { newCategorySchema } from '$lib/schema/newCategorySchema';
import { setError, setMessage, superValidate } from 'sveltekit-superforms/server';

export const load = (async ({ locals }) => {
    const res = await fetch(`http://api:${process.env.API_PORT}/stats/totalSpent`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
    if (res.status !== 200) {
        error(500, {
            message: 'Error fetching stats',
        });
    }
    const totalSpent = await res.json();

    return { ...totalSpent };
}) satisfies PageServerLoad;

