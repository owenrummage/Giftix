// src/routes/gift/toggle/+server.ts
import { json } from '@sveltejs/kit';
import { prisma } from '$lib'; // Update to match your prisma import
import { useAuthentication } from '$lib/auth'; // Your custom authentication function
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		// Step 1: Extract the session token from cookies
		const sessionToken = cookies.get('session');
		if (!sessionToken) {
			return json({ error: 'Unauthorized: No session token found' }, { status: 401 });
		}

		// Step 2: Authenticate the user
		const user = await useAuthentication(sessionToken);
		if (!user) {
			return json({ error: 'Unauthorized: Invalid session token' }, { status: 401 });
		}

		// Step 3: Parse the request body for gift ID
		const body = await request.json();
		const { giftId } = body;

		if (!giftId) {
			return json({ error: 'Invalid request: Missing gift ID' }, { status: 400 });
		}

		// Step 4: Fetch the current gift state
		const gift = await prisma.gift.findUnique({
			where: { id: giftId }
		});

		if (!gift) {
			return json({ error: 'Gift not found' }, { status: 404 });
		}

		// Step 5: Check if the gift is reserved by someone else
		if (gift.reservedBy && gift.reservedBy !== user.id.toString()) {
			return json({ error: 'This gift is already reserved by another user' }, { status: 403 });
		}

		// Step 6: Toggle the reservation status
		const isReserved = gift.reservedBy !== '';

		const updatedGift = await prisma.gift.update({
			where: { id: giftId },
			data: {
				reservedBy: isReserved ? '' : user.id.toString() // Toggle reservedBy
			}
		});

		// Step 7: Respond with the new reservation status
		return json({ reserved: updatedGift.reservedBy !== '' });
	} catch (error) {
		console.error(error);
		return json({ error: 'An error occurred while toggling the reservation' }, { status: 500 });
	}
};
