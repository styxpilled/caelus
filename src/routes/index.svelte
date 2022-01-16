<script context="module" lang="ts">
	export const ssr = false;
</script>

<script>
	import { onMount } from 'svelte';
	import { createScene } from '$lib/scene';
	let el;
	onMount(() => {
		createScene(el);
	});
</script>

<section class="frame">
	<div id="result">
		<canvas bind:this={el} />
	</div>
	<div id="editor">
		<h1>A spectre is haunting Europe — the spectre of communism.</h1>
		<p>
			Where is the party in opposition that has not been decried as communistic by its opponents in
			power?
		</p>
	</div>
</section>

<style lang="scss">
	.frame {
		display: flex;
		flex: 1 1 0px;
		flex-direction: row;
		width: 60rem;
		height: 30rem;
	}
	// canvas {
	// 	width: 100%;
	// 	height: 100%;
	// }
</style>
