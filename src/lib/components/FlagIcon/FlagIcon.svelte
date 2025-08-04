<!-- src/lib/components/FlagIcon.svelte -->
<script lang="ts">
	export let code: string;
	export let size: number = 24;
</script>

<span class={`fi fi-${code.toLowerCase()}`} style={`font-size: ${size}px`}></span>
