<script lang="ts">
  import '../app.css'
  import Nav from '$lib/components/Navbar.svelte'
  import ScrollArrow from '$lib/components/ScrollArrow.svelte'
  let { children } = $props()
</script>

<div class="bg-base-100 p-0 m-0 min-w-screen min-h-screen flex flex-col">
  <Nav />
  <div class="flex flex-col flex-grow">
    {@render children()}
  </div>
  <ScrollArrow />
</div>
