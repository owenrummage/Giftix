// src/routes/logout/+server.ts
import { APP_DOMAIN, AUTH_SERVER } from '$lib/auth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	// Delete the session cookie
	cookies.delete('session', { path: '/' });

	// // Redirect to the home page (or a login page, depending on your app)
	return new Response(null, {
		status: 301,
		headers: {
			Location: `${AUTH_SERVER}/logout?redirect=${APP_DOMAIN}` // Change this to your desired post-logout destination
		}
	});
};
