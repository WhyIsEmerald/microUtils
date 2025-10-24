<script lang="ts">
  import CompressInput from '$lib/components/CompressInput.svelte'
  import CompressType from '$lib/components/CompressType.svelte'
  import CompressOutput from '$lib/components/CompressOutput.svelte'
  import CompressStep from '$lib/components/CompressStep.svelte'
  let step = 'step1'
  let type = ''
  let inputFile: File | null = null
  let outputFile: File | null = null
  $: if (type && step === 'step1') {
    step = 'step2'
  }
  $: if (inputFile && step === 'step2') {
    step = 'step3'
  }
</script>

<div class="hero flex flex-col flex-grow p-8 gap-2">
  {#if step === 'step1'}
    <CompressType bind:type />
  {:else if step === 'step2'}
    <CompressInput bind:inputFile bind:type />
  {:else if step === 'step3'}
    <CompressOutput bind:outputFile bind:inputFile {type} />
  {/if}
  <CompressStep {step} />
</div>
