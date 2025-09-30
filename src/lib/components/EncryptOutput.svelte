<script lang="ts">
  export let outputFile: File | null = null
  export let inputFile: File | null = null
  export let type = ''
  export let password = ''
  import { encrypt, decrypt } from '$lib/scripts/encryption'
  let loading = false
  let error: string | null = null

  async function handleSubmit(event: Event) {
    if (!inputFile) {
      error = 'Please provide an input file.'
      return
    }
    if (!password) {
      error = 'Please provide a password.'
      return
    }

    loading = true
    error = null

    try {
      const fileContent = await inputFile.text()
      let resultData: string
      let outputFilename: string

      if (type === 'Encrypt') {
        resultData = await encrypt(fileContent, password)
        outputFilename = `${inputFile.name}.enc`
      } else if (type === 'Decrypt') {
        resultData = await decrypt(fileContent, password)
        outputFilename = inputFile.name.endsWith('.enc')
          ? inputFile.name.slice(0, -4)
          : `decrypted-${inputFile.name}`
      } else {
        throw new Error(`Unsupported operation type: ${type}`)
      }

      const blob = new Blob([resultData], { type: 'text/plain;charset=utf-8' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = outputFilename
      link.click()
      URL.revokeObjectURL(link.href)
    } catch (e) {
      console.error(e)
      error = `Operation failed. For decryption, ensure the password is correct and the file is not corrupted.`
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
