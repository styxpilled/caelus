<script lang="ts">
  import Header from "$lib/Header.svelte";
  import "$styles/app.pcss";
</script>

<Header />
<main>
  <slot />
</main>

<footer>
  <p>webgl was a mistake</p>
</footer>