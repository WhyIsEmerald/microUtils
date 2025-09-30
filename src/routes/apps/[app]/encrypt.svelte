<script lang="ts">
  import EncryptInput from '$lib/components/EncryptInput.svelte'
  import EncryptType from '$lib/components/EncryptType.svelte'
  import EncryptOutput from '$lib/components/EncryptOutput.svelte'
  import EncryptStep from '$lib/components/EncryptStep.svelte'
  let step = 'step1'
  let password = ''
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
    <EncryptType bind:type />
  {:else if step === 'step2'}
    <EncryptInput bind:inputFile bind:type bind:password />
  {:else if step === 'step3'}
    <EncryptOutput bind:outputFile bind:inputFile {type} bind:password />
  {/if}
  <EncryptStep bind:step />
</div>
