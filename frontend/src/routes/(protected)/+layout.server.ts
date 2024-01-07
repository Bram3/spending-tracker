import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';


export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.token) {
        throw redirect(301, "/auth/login")
    }
    if (!locals.user) {
        const res = await fetch(`http://api:${process.env.API_PORT}/users/me`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
        if (res.status === 200) {
            locals.user = await res.json();
        }
        else {
            throw redirect(301, "/auth/login")
        }
    }

    return {
        user: locals.user,
    };
};

