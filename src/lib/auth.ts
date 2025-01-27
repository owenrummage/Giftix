import { redirect } from '@sveltejs/kit';
export const AUTH_SERVER = process.env.AUTH_SERVER || '`';
export const APP_DOMAIN = process.env.APP_DOMAIN || '';

const AUTH_URL = `${AUTH_SERVER}/login?redirect=${APP_DOMAIN}/auth/callback`;
export async function useAuthentication(sessionToken: string | undefined) {
	if (!sessionToken) return redirect(301, AUTH_URL);

	try {
		// Call the API to get user information
		const response = await fetch(`${AUTH_SERVER}/api/me`, {
			headers: {
				Cookie: `session_id=${sessionToken}`
			}
		});

		// If the response is not OK, redirect to AUTH_URL
		if (!response.ok) {
			throw new Error(`Fetch error: ` + response.status);
		}

		// Parse and return the user data
		const user = await response.json();
		return {
			...user
		};
	} catch (error) {
		// On any error, redirect to the AUTH_URL
		throw error;
	}
}
