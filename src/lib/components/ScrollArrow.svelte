<script lang="ts">
  import { onMount } from 'svelte'
  let showArrow = false
  import { navigating } from '$app/stores'

  $: if ($navigating) updateArrow()
  function updateArrow() {
    console.log('arrow update')
    // Use the maximum of body and html scrollHeight
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    )
    const isOverflowing = scrollHeight > window.innerHeight + 2 // 2px fudge for rounding
    const atTop = window.scrollY === 0
    showArrow = isOverflowing && atTop
  }

  function scrollDown() {
    window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' })
  }

  onMount(() => {
    updateArrow()
    window.addEventListener('mousemove', updateArrow)
  })
</script>

{#if showArrow}
  <button
    on:click={scrollDown}
    style="
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      font-size: 2rem;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--arrow-color, #888);
      transition: opacity 0.2s;
    "
    aria-label="Scroll down"
  >
    &#8595;
  </button>
{/if}
