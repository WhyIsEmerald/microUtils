<script lang="ts">
  import Iso from '$lib/components/CurrencyCodes.svelte'
</script>

<div class="hero bg-base-100 flex-grow overflow-hidden">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Currency Converter</h1>
      <p class="py-6">Convert between different currencies with ease.</p>
    </div>
    <div
      class="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl motion-translate-y-in-100 motion-duration-1500"
    >
      <div class="card-body">
        <Iso />
      </div>
    </div>
  </div>
</div>
