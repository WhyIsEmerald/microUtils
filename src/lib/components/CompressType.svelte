<script lang="ts">
  import { fade } from 'svelte/transition'
  import { onMount, onDestroy } from 'svelte'

  export let type = ''
  let temp = ''

  // Animation logic
  let words = ['Compressor', 'Decompressor']
  let wordIndex = 0
  let animatedWord = words[wordIndex]
  let interval: ReturnType<typeof setInterval>

  onMount(() => {
    interval = setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length
      animatedWord = words[wordIndex]
    }, 2000)
  })

  onDestroy(() => {
    clearInterval(interval)
  })

  function handleSubmit(event: Event) {
    event.preventDefault()
    type = temp
  }
</script>

<div class="hero h-max flex-grow">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">
        File <span class="motion-blur-loop-md motion-duration-2000"
          >{animatedWord}</span
        >
      </h1>
      <p class="py-6">
        <span>{animatedWord}</span> your files quickly and easily.
      </p>
      <p class="py-6">
        Choose what you would like to <span>{animatedWord.toLowerCase()}</span>.
      </p>
      <form
        on:submit|preventDefault={handleSubmit}
        class="grid grid-cols-1 gap-4"
      >
        <label class="select w-full">
          <span class="label">Type</span>
          <select class="select w-full" bind:value={temp} required>
            <option value="" disabled selected>Pick a type</option>
            <option value="Compress">Compress</option>
            <option value="Decompress">Decompress</option>
          </select>
        </label>
        <button class="btn btn-primary" type="submit">Get Started</button>
      </form>
    </div>
  </div>
</div>
