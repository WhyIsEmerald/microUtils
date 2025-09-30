<script lang="ts">
  export let inputFile: File | null = null
  export let type = ''
  let temp: File | null = null

  function handleSubmit(event: Event) {
    event.preventDefault()
    inputFile = temp
  }

  function handleFileChange(e: Event) {
    const files = (e.target as HTMLInputElement).files
    temp = files && files.length > 0 ? files[0] : null
  }
</script>

<div class="hero h-max flex-grow">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">File {type}</h1>
      <p class="py-6">{type} your files quickly and easily.</p>
      <p class="py-6">Choose what file you want to {type.toLowerCase()}.</p>
      <form
        on:submit|preventDefault={handleSubmit}
        class="grid grid-cols-1 gap-4"
      >
        <input
          type="file"
          on:change={handleFileChange}
          class="file-input file-input-primary w-full"
        />
        <button class="btn btn-primary" type="submit">Confirm</button>
        <p class="text-sm text-gray-500">
          Note: You can only decompress files compressed using this app.
        </p>
      </form>
    </div>
  </div>
</div>

<style>
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-move 3s ease-in-out infinite;
  }

  @keyframes gradient-move {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
