import type { Actions, PageServerLoad } from "./$types";
import { superValidate, setError, setMessage } from 'sveltekit-superforms/server';
import { fail, redirect } from "@sveltejs/kit";
import { signupSchema } from "$lib/schema/signupSchema";

export const load: PageServerLoad = async () => {
    const form = await superValidate(signupSchema);
    return { form };
};


export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, signupSchema);

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            const res = await fetch(`http://api:${process.env.API_PORT}/auth/register`, { body: JSON.stringify({ "email": form.data.email, "password": form.data.password }), method: 'POST', headers: { 'Content-Type': 'application/json' } })
            if (res.status === 403) {
                return setMessage(form, 'Creating accounts is disabled on this server.', { status: 400 });
            } else if (res.status === 400) {
                return setError(form, 'email', 'Error creating user. Email possibly already in use.');
            } else if (res.status === 500 || res.status === 401) {
                return setMessage(form, 'An unknown error occurred', { status: 500 });
            }
        } catch (e) {
            console.error(e);
            return setMessage(form, 'An unknown error occurred', { status: 500 });
        }
        // redirect to
        // make sure you don't throw inside a try/catch block!
        throw redirect(302, '/auth/login');
    }
};