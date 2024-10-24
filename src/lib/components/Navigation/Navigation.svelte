<script lang="ts">
	export let data;
</script>

<nav class="bg-primary">
	<div class="w-screen">
		<div class="flex h-16 items-center justify-center">
			<div class="">
				<div class="">
					<div class="flex flex-wrap space-4 items-center">
						{#each data.categories as category}
							<div class="my-1">
								<a
									href={`/pages/categories/${category.path}`}
									class="rounded-md px-3 py-2 text-sm font-semibold uppercase font-sans hover:bg-primaryHover hover:text-white"
								>
									{category.name}
								</a>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>
