// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { useAuthentication } from '$lib/auth';
import { prisma } from '$lib';

export const load: PageServerLoad = async ({ cookies }) => {
	let sessionToken = cookies.get('session');

	const data = await useAuthentication(sessionToken);

	let gifts = await prisma.gift.findMany();

	return {
		user: data,
		gifts
	};
};
