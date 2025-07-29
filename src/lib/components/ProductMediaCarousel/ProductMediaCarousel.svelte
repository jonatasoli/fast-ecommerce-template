<script lang="ts">
	import { onMount } from 'svelte';
	import EmblaCarousel from 'embla-carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import { ChevronLeft, ChevronRight } from 'svelte-heros-v2';
	import type { MediaItem } from '$lib/types';

	export let carousel: MediaItem[] = [];
	export let height: string = 'h-80';
	export let autoplay: boolean = true;

	let embla: any = null;
	let selectedIndex = 0;
	let viewport: HTMLDivElement;

	onMount(() => {
		const plugins = autoplay ? [Autoplay({ delay: 3000 })] : [];
		embla = EmblaCarousel(viewport, { loop: true }, plugins);

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

	function handleVideoPlay() {
		// embla?.plugins()?.forEach((p) => p.stop?.());
		autoplay = false; // Disable autoplay when video is playing
	}

	function handleVideoEnded() {
		autoplay = true; // Re-enable autoplay when video ends
		// if (autoplay) {
		// 	embla?.plugins()?.forEach((p) => p.play?.());
		// }
	}
</script>

{#if carousel && carousel.length > 0}
	<div class="relative w-full max-w-md mx-auto overflow-hidden">
		<!-- Viewport do Embla -->
		<div class="embla__viewport overflow-hidden" bind:this={viewport}>
			<div class="embla__container flex">
				{#each carousel as media, index}
					<div class="embla__slide flex-shrink-0 w-full relative">
						{#if media.type === 'PHOTO'}
							<img
								class={`w-full ${height} object-contain`}
								src={media.uri}
								alt={`Imagem do produto ${index + 1}`}
							/>
						{:else if media.type === 'VIDEO'}
							<video
								class={`w-full ${height} object-contain`}
								src={media.uri}
								controls
								aria-label={`Vídeo do produto ${index + 1}`}
								on:play={handleVideoPlay}
								on:pause={handleVideoEnded}
								on:ended={handleVideoEnded}
							>
								<track kind="captions" label="Sem legendas" />
							</video>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Botões Prev/Next -->
		<button
			on:click={scrollPrev}
			aria-label="Slide anterior"
			class="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
		>
			<ChevronLeft class="w-5 h-5" />
		</button>
		<button
			on:click={scrollNext}
			aria-label="Próximo slide"
			class="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
		>
			<ChevronRight class="w-5 h-5" />
		</button>

		<!-- Indicadores -->
		<div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
			{#each carousel as _, i}
				<button
					aria-label={`Ir para slide ${i + 1}`}
					class="w-2 h-2 rounded-full transition-all duration-300 transform"
					class:bg-white={selectedIndex === i}
					class:bg-white50={selectedIndex !== i}
					class:scale-125={selectedIndex === i}
					class:opacity-100={selectedIndex === i}
					class:opacity-70={selectedIndex !== i}
					on:click={() => scrollTo(i)}
				></button>
			{/each}
		</div>
	</div>
{:else}
	<p class="text-center text-gray-500">Nenhuma mídia disponível.</p>
{/if}
