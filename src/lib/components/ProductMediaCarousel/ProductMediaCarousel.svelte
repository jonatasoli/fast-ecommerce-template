<script lang="ts">
	import { onMount } from 'svelte';
	import EmblaCarousel from 'embla-carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import { ChevronLeft, ChevronRight } from 'svelte-heros-v2';
	import type { MediaItem } from '$lib/types';
	import { _ } from 'svelte-i18n';
	export let carousel: MediaItem[] = [];
	export let height: string = 'h-80';
	export let autoplay: boolean = true;
	export let loop: boolean = true;

	let embla: any = null;
	let autoplayPlugin: any = null;
	let selectedIndex = 0;
	let viewport: HTMLDivElement;
	let videoPlaying = false;

	function initializeEmbla() {
		const plugins = autoplay ? [Autoplay({ delay: 3000 })] : [];

		const options = {
			loop: loop
		};

		embla = EmblaCarousel(viewport, options, plugins);
		autoplayPlugin = plugins[0];

		embla.on('select', () => {
			selectedIndex = embla?.selectedScrollSnap() ?? 0;
		});
	}

	onMount(() => {
		initializeEmbla();
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
		if (embla && autoplayPlugin) {
			autoplayPlugin.stop();
		}
		autoplay = false;
		loop = false;
		videoPlaying = true;
	}

	function handleVideoPause() {
		if (videoPlaying) {
			setTimeout(() => {
				autoplay = true;
				loop = true;
				if (autoplayPlugin) {
					autoplayPlugin.play();
				}
				videoPlaying = false;
			}, 3000);
		}
	}

	function handleVideoEnded() {
		autoplay = true;
		loop = true;
		if (autoplayPlugin) {
			autoplayPlugin.play();
		}
		videoPlaying = false;
	}
</script>

{#if carousel && carousel.length > 0}
	<div class="relative w-full max-w-md mx-auto overflow-hidden">
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
								on:pause={handleVideoPause}
								on:ended={handleVideoEnded}
							>
								<track kind="captions" label="Sem legendas" />
							</video>
						{/if}
					</div>
				{/each}
			</div>
		</div>

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
	<p class="text-center text-gray-500">{$_('RandomDescriptions.emptyMedia')}</p>
{/if}
