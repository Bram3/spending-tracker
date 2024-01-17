import { error, type RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({ url, locals, params, setHeaders }) => {
    try {
        const attachmentRes = await fetch(`http://api:${process.env.API_PORT}/attachments/${params.attachmentId}`, {
            headers: { 'Authorization': `Bearer ${locals.token}` }
        });

        if (attachmentRes.status !== 200) {
            throw error(500, 'Error fetching attachments');
        }

        // Ensure the headers are set correctly for an image response
        const contentType = attachmentRes.headers.get('content-type') || 'application/octet-stream';
        setHeaders({
            'Content-Type': contentType,
        });

        // Return the response stream directly
        return new Response(attachmentRes.body);
    } catch (err) {
        // Handle errors appropriately
        throw error(500, 'Server error');
    }
};