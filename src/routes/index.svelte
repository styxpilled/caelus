<script context="module" lang="ts">
  export const ssr = false;
</script>

<script>
  import { onMount } from 'svelte';
  import { createScene } from '$lib/scene';
  import { createScene2 } from '$lib/scene2';
  let el, el2;
  onMount(() => {
    createScene(el);
    createScene2(el2);
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
<section class="frame">
  <div id="editor">
    <h1>this is why I like joe rogan he is good at thinking</h1>
    <p>
      Have you watched the lord of the rings,man? Yeah? If you remember there’s this little dude,
      Gollum, he’s a fuckin’ genius man. Eats nothing but raw meat, fish; dudes got his paleo diet
      down to an art, man. Bear-crawls everywhere, rock-climbing, dude’s athletic as fuck. He should
      not look as scrawny as he does, he should be one scary looking motherfucker, all muscle. No
      offense to Tolkien but he doesn’t know shit about fitness. I’ve started eating live fish and
      bear crawling everywhere, and I gotta tell ya I feel incredible, best shape I’ve ever been in.
      I’m telling you, man, Gollum’s like a Hobbit chimpanzee.
    </p>
  </div>
  <div id="result">
    <canvas bind:this={el2} />
  </div>
</section>

<style lang="postcss">
  @import "variables.pcss";

  .frame {
    display: flex;
    flex: 1 1 0px;
    flex-direction: row;
    width: 60rem;
    height: 30rem;
  }

  canvas {
    /* background-color: aqua; */
    width: 30rem;
    height: 30rem;
  }
</style>
