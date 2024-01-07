import { error, redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, cookies }) => {
    if (!locals.token) throw error(401, "Invalid Session");
    cookies.delete('token', { path: '/' });

    throw redirect(302, "/auth/login")
}