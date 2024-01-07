import type { PageServerLoad } from "./$types";
import { setMessage, superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/schema/loginSchema';
import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async () => {
    const form = await superValidate(loginSchema);
    return { form };
};

export const actions: Actions = {
    default: async ({ request, locals, cookies }) => {
        const form = await superValidate(request, loginSchema);

        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }
        try {
            const res = await fetch(`http://api:${process.env.API_PORT}/auth/login`, { body: JSON.stringify(form.data), method: 'POST', headers: { 'Content-Type': 'application/json' } })
            if (res.status === 201) {
                cookies.set('token', (await res.json()).access_token, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 1000 });
            }
            else if (res.status === 401) {
                return setMessage(form, 'Incorrect username or password', { status: 400 });
            } else if (res.status === 400) {
                return setMessage(form, 'An unknown error occurred', { status: 400 });
            } else if (res.status === 500) {
                return setMessage(form, 'An unknown error occurred', { status: 500 });
            }
        } catch (e) {
            console.error(e);
            return setMessage(form, 'An unknown error occurred', { status: 500 });
        }
        throw redirect(301, '/transactions');
    }
}