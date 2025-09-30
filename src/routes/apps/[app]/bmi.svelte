<script lang="ts">
  import Inputs from '$lib/components/BMI_Inputs.svelte'
</script>

<div class="h-screen flex flex-col">
  <div class="hero bg-base-100 flex-grow overflow-hidden">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Find your BMI now!</h1>
        <p class="py-6"></p>
      </div>
      <div
        class="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl motion-translate-y-in-100 motion-duration-1500"
      >
        <div class="card-body">
          <Inputs />
        </div>
      </div>
    </div>
  </div>
</div>
