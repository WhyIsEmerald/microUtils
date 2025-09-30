<script lang="ts">
  let weight: number
  let height: number
  let bmi: number | null = null

  function getBMI() {
    if (weight > 0 && height > 0) {
      // Convert height from cm to meters
      const heightInMeters = height / 100
      bmi = weight / heightInMeters ** 2
    } else {
      bmi = null
    }
  }
</script>

<div class="rounded-xl p-10">
  <h1 class="text-3xl font-bold text-center">BMI Calculator</h1>
  <fieldset class="fieldset">
    <p class="fieldset-legend">Enter your mass:</p>
    <input
      type="number"
      class="input"
      placeholder="Enter your mass here"
      bind:value={weight}
    />
    <p class="label">(in kilograms)</p>

    <p class="fieldset-legend">Enter your height:</p>
    <input
      type="number"
      class="input"
      placeholder="Enter your height here"
      bind:value={height}
    />
    <p class="label">(in cms)</p>

    <button class="btn btn-primary btn-outline" on:click={getBMI}
      >Calculate</button
    >
  </fieldset>
  {#if bmi !== null}
    <p class="mt-4 text-center font-semibold">
      Your BMI is:
      <span class="text-primary">{bmi.toFixed(2)}</span>
      {#if bmi < 10}
        <span class="text-primary"> (u good?)</span>
      {/if}
    </p>
    <p class="mt-4 text-center font-semibold text-accent">
      Scroll down to see more info about your BMI
    </p>
  {/if}
</div>
