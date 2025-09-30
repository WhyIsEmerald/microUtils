<script lang="ts">
  let Max: number = 100
  let Min: number = 0
  let Random: number = 0
  $: error = Min > Max ? 'Min cannot be greater than Max.' : null
  $: areNumbersLarge = Max > 10000 || Min > 10000 || Random > 10000
</script>

<div class="hero bg-base-200 flex-grow">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Randomizer</h1>
      <div
        class="stats shadow stats-vertical"
        class:lg:stats-horizontal={!areNumbersLarge}
      >
        <div class="stat place-items-center">
          <div class="stat-title">Min</div>
          <div class="stat-value break-all">{Min}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Max</div>
          <div class="stat-value text-secondary break-all">{Max}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Random Number</div>
          <div class="stat-value break-all">{Random}</div>
        </div>
      </div>
      <label class="input w-full m-2">
        <span class="label">Min</span>
        <input type="number" bind:value={Min} />
      </label>
      <label class="input w-full m-2">
        <span class="label">Max</span>
        <input type="number" bind:value={Max} />
      </label>

      {#if error}
        <div role="alert" class="alert alert-error mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>{error}</span>
        </div>
      {/if}

      <button
        class="btn btn-primary mt-2"
        disabled={!!error}
        on:click={() => {
          Random = Math.floor(Math.random() * (Max - Min + 1)) + Min
        }}>Randomize</button
      >
    </div>
  </div>
</div>
