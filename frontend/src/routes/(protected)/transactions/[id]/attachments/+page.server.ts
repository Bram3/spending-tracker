import { newTransactionSchema } from '$lib/schema/newTransactionSchema';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { setMessage, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { invalidateAll } from '$app/navigation';

export const load = (async ({ locals, params }) => {


    const attachmentsRes = await fetch(`http://api:${process.env.API_PORT}/transactions/${params.id}/attachments`, { headers: { 'Authorization': `Bearer ${locals.token}` } });
    if (attachmentsRes.status !== 200) {
        error(500, {
            message: 'Error fetching attachments',
        });
    }
    const attachments = await attachmentsRes.json();

    return { attachments, apiUrl: `http://api:${process.env.API_PORT}` };
}) satisfies PageServerLoad;

export const actions: Actions = {

    delete: async ({ request, locals }) => {
        const data = await request.formData()
        const res = await fetch(`http://api:${process.env.API_PORT}/attachments/${data.get("id")}`, { headers: { 'Authorization': `Bearer ${locals.token}` }, method: "DELETE" });
        if (res.status !== 200) {
            const json = await res.json();
            error(json.statusCode, {
                message: json.message,
            });


        }
        throw redirect(302, '/transactions')
    },
    upload: async ({ params, request, locals, }) => {
        const formData = await request.formData()

        const files = formData.getAll('files');
        console.log(files);
        if (files) {
            const data = new FormData();
            files.forEach(file => {
                data.append('files', file);
            })
            const filesRes = await fetch(`http://api:${process.env.API_PORT}/transactions/${params.id}/attachments`, { headers: { 'Authorization': `Bearer ${locals.token}` }, method: "POST", body: data });
            if (filesRes.status !== 201) {
                const json = await filesRes.json();
                error(json.statusCode, {
                    message: json.message,
                });
            }
        }

        throw redirect(302, '/transactions')
    }
};

