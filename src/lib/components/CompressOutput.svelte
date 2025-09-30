<script lang="ts">
  export let outputFile: File | null = null
  export let inputFile: File | null = null
  export let type = ''
  import { compress, decompress } from '$lib/scripts/compression'
  let temp: File | null = null
  let loading = false
  let error: string | null = null

  async function handleSubmit(event: Event) {
    event.preventDefault()
    error = null
    if (!inputFile) {
      outputFile = null
      error = 'Please select a file first.'
      return
    }
    loading = true
    let file: File | null = null
    try {
      if (type === 'Compress') {
        const arrayBuffer = await inputFile.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)
        const compressedBuffer = await compress(buffer)
        file = new File([compressedBuffer], inputFile.name + '.compressed', {
          type: inputFile.type
        })
      } else if (type === 'Decompress') {
        const arrayBuffer = await inputFile.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)
        const decompressedBuffer = await decompress(buffer)
        file = new File(
          [decompressedBuffer],
          inputFile.name.replace(/\.compressed$/, ''),
          { type: inputFile.type }
        )
      }
      outputFile = file
      if (file) {
        const url = URL.createObjectURL(file)
        const a = document.createElement('a')
        a.href = url
        a.download = file.name
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }, 100)
      }
    } catch (e) {
      error = 'An error occurred during processing.'
      outputFile = null
    } finally {
      loading = false
    }
  }
</script>

<div class="hero h-max flex-grow">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">File {type}</h1>
      <p class="py-6">
        Download your {type.toLowerCase() + 'ed'} files quickly and easily.
      </p>
      <p class="py-6">
        Press the button to download the {type.toLowerCase() + 'ed'} file.
      </p>
      <form
        on:submit|preventDefault={handleSubmit}
        class="grid grid-cols-1 gap-4"
      >
        <button class="btn btn-primary" type="submit" disabled={loading}>
          {#if loading}
            <span class="loading loading-bar loading-md"></span>
            Processing...
          {:else}
            Download
          {/if}
        </button>
        {#if error}
          <div class="alert alert-error text-sm">{error}</div>
        {/if}
        {#if type === 'Decompress'}
          <p class="text-sm text-gray-500">
            Note: You can only {type.toLowerCase()} files that are already compressed.
          </p>
        {/if}
      </form>
    </div>
  </div>
</div>
