<script lang="ts">
	export let latestCategories;

	console.log('Latest Categories:', latestCategories);
</script>

<div class="sm:flex sm:flex-wrap justify-center">
	{#each latestCategories as category}
		{#if category.image_path}
			<a
				href={`/pages/categories/${category.path}`}
				class="relative pt-8 overflow-hidden w-full lg:w-96 sm:m-5"
			>
				<div class="relative pt-8 overflow-hidden w-full lg:w-96 sm:m-5">
					<div class="feature-item__link overflow-hidden bg-white lg:h-56">
						<img
							src={category.image_path}
							alt={category.name}
							class="w-full h-full object-cover transition-transform duration-200 ease-in-out hover:scale-105"
						/>
					</div>
					<div
						class="feature-item__label bg-primary-500 text-white text-center text-lg leading-8 flex w-full max-w-xs items-center uppercase justify-center h-12 absolute left-1/2 transform -translate-x-1/2 top-0"
					>
						{category.name}
					</div>
				</div>
			</a>
		{/if}
	{/each}
</div>
