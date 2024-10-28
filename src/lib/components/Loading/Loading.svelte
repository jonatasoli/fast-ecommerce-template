<script>
	export let visible = false;
</script>

{#if visible}
	<div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
		<div
			class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"
		></div>
	</div>
{/if}
