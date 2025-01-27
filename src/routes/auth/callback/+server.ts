// src/routes/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		return new Response('Error: token does not exist', { status: 400 });
	}

	// Set the "session" cookie
	cookies.set('session', token, {
		path: '/', // Cookie is available across the entire site
		httpOnly: true, // Cookie is not accessible via JavaScript
		sameSite: 'strict', // Prevent CSRF
		secure: true, // Only send over HTTPS
		maxAge: 60 * 60 * 24 // 1 day
	});

	// Redirect to the home page
	return new Response(null, {
		status: 303, // HTTP 303 See Other
		headers: {
			Location: '/' // Redirect to home page
		}
	});
};
