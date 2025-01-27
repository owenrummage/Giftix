<script lang="ts">
	import GiftItem from '$lib/components/GiftItem.svelte';

	export let data;
</script>

<div class="flex flex-row justify-between w-full font-bold">
	<h1 class="">Welcome Back, {data.user.firstName}</h1>
	<a href="/auth/logout">Logout</a>
</div>
<div class="max-w-screen-sm mt-12">
	<h1 class="text-2xl font-bold">Owen's Gift List</h1>
	<p>
		Please see below for a list of gifts you can get me. All of the gifts on this list are
		thoughtful things that I need for school, work, or my hobbies and would appreciate and use for
		years to come
	</p>
	<div id="about" class="mt-4">
		<h1 class="text-2xl font-bold mb-2">How to use</h1>
		<ul>
			<li>
				<h1 class="text-xl font-semibold">1. Select a gift</h1>
				<p>Select a gift from the list that fits your price range</p>
			</li>
			<li>
				<h1 class="text-xl font-semibold">2. Reserve the gift</h1>
				<p>Hit the reserve button and fill out the information</p>
			</li>
			<li>
				<h1 class="text-xl font-semibold">3. Buy the gift!</h1>
				<p>Buy it and give it to Owen!</p>
			</li>
		</ul>

		<p class="mt-4">
			Star rating is used to show how much I want an item. The more stars, the higher priority the
			item is.
		</p>
	</div>
</div>
<div class="flex flex-wrap justify-center mt-12 flex-row gap-12">
	{#each data.gifts as gift}
		<GiftItem {gift} userId={data.user.id.toString()} />
	{/each}
</div>
