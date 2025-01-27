<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="p-4 md:p-12">
	{@render children()}
</div>
