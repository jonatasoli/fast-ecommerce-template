<script lang="ts">
	import { onMount } from 'svelte';
	import EmblaCarousel from 'embla-carousel';
	import type { EmblaCarouselType } from 'embla-carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import { ChevronLeft, ChevronRight } from 'svelte-heros-v2';

	export let height: string = 'h-64';
	export let images: any[] = []; // Lista de imagens recebida via prop

	let embla: EmblaCarouselType | null = null;
	let selectedIndex = 0;

	console.log('Carousel images:', images);

	onMount(() => {
		const viewport = document.querySelector('.embla__viewport');
		if (!viewport) return;

		embla = EmblaCarousel(viewport, { loop: true }, [Autoplay({ delay: 3000 })]);

		embla.on('select', () => {
			selectedIndex = embla?.selectedScrollSnap() ?? 0;
		});
	});

	function scrollTo(index: number) {
		embla?.scrollTo(index);
	}

	function scrollPrev() {
		embla?.scrollPrev();
	}

	function scrollNext() {
		embla?.scrollNext();
	}
</script>

{#if images.length > 0}
	<div class="relative w-full overflow-hidden">
		
		<div class="embla__viewport overflow-hidden">
			<div class="embla__container flex">
				{#each images as img, i}
					<div class="embla__slide flex-shrink-0 w-full relative">
						<img
							src={img.image_path}
							alt={`Slide ${i + 1}`}
							class={`w-full ${height} object-cover`}
						/>
					</div>
				{/each}
			</div>
		</div>

		
		<button
			on:click={scrollPrev}
			class="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full text-sm hover:bg-black/60"
		>
			<ChevronLeft class="w-5 h-5" />
		</button>

		
		<button
			on:click={scrollNext}
			class="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full text-sm hover:bg-black/60"
		>
			<ChevronRight class="w-5 h-5" />
		</button>

		
		<div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
			{#each images as _, i}
				<button
					aria-label="Próximo slide"
					class="w-2 h-2 rounded-full transition-all duration-300 transform"
					class:bg-white={selectedIndex === i}
					class:bg-white-50={selectedIndex !== i}
					class:scale-125={selectedIndex === i}
					class:opacity-100={selectedIndex === i}
					class:opacity-70={selectedIndex !== i}
					on:click={() => scrollTo(i)}
				></button>
			{/each}
		</div>
	</div>
{:else}
	<p class="text-center text-gray-500">Nenhuma imagem disponível.</p>
{/if}
