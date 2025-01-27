<script lang="ts">
	import type { Gift } from '@prisma/client';
	import { writable } from 'svelte/store';

	export let gift: Gift; // Pass the gift ID as a prop to the component
	export let userId: string;

	let reservationStatus = gift.reservedBy !== ''; // Tracks if the gift is reserved or not
	const errorMessage = writable(null); // Tracks any error messages

	// Function to toggle reservation
	async function toggleReservation() {
		try {
			errorMessage.set(null); // Clear any previous errors

			const response = await fetch(`/api/reserve`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ giftId: gift.id })
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to toggle reservation');
			}

			window.location.reload();
		} catch (error: any) {
			console.error(error);
			errorMessage.set(error.message); // Set the error message
		}
	}
</script>

<div
	class="rounded-xl w-full sm:max-w-72 flex flex-col p-4 border-2 border-dashed border-black dark:border-white shadow-lg"
>
	<img src={gift.imageURL} alt={gift.name} class="rounded-lg mb-4 h-48 w-full object-cover" />

	<h3 class="text-xl font-semibold mb-2">{gift.name}</h3>
	<p class="text-md text-neutral-600 dark:text-neutral-300">Price: ${gift.price}</p>
	<p class="text-md text-neutral-600 dark:text-neutral-300 mb-4">
		Star Rating: {gift.priority}/5
	</p>

	{#if reservationStatus === null}
		<p class="text-neutral-500">Loading reservation status...</p>
	{:else if gift.reservedBy && gift.reservedBy !== userId}
		<p class="text-yellow-500 mb-2">Reserved by Someone Else</p>
		<button
			class="mt-auto bg-gray-500 py-2 px-4 rounded-lg text-sm text-white cursor-not-allowed"
			disabled>Reserved</button
		>
	{:else if gift.reservedBy === userId}
		<p class="text-green-500 mb-2">Reserved by You</p>
		<button
			class="mt-auto bg-blue-500 py-2 px-4 rounded-lg text-sm text-white hover:bg-blue-700 transition-all"
			on:click={toggleReservation}>Unreserve</button
		>
	{:else}
		<p class="text-red-500 mb-2">This gift is not reserved.</p>
		<button
			class="mt-auto bg-blue-500 py-2 px-4 rounded-lg text-sm text-white hover:bg-blue-700 transition-all"
			on:click={toggleReservation}>Reserve</button
		>
	{/if}

	{#if $errorMessage}
		<p class="text-red-500 mt-2 text-sm">Error: {$errorMessage}</p>
	{/if}
</div>
