<script lang="ts">
  export let inputFile: File | null = null
  export let type = ''
  export let password = ''
  let temp: File | null = null
  let showPassword = false

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
      <h1 class="text-5xl font-bold">File {type + 'or'}</h1>
      <p class="py-6">{type} your files quickly and easily.</p>
      <p class="py-6">Choose what file you want to {type.toLowerCase()}.</p>
      <form
        on:submit|preventDefault={handleSubmit}
        class="grid grid-cols-1 gap-4"
      >
        <input
          type="file"
          required
          on:change={handleFileChange}
          class="file-input file-input-primary w-full"
        />
        <label class="input w-full">
          <span class="label">password</span>
          <input
            bind:value={password}
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            required
          />
          <span class="label"
            ><button
              type="button"
              tabindex="-1"
              on:click={() => (showPassword = !showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {#if showPassword}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                  ><path
                    d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
                  /></svg
                >
              {:else}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                  ><path
                    d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"
                  /></svg
                >
              {/if}
            </button></span
          >
        </label>
        <button class="btn btn-primary" type="submit">Confirm</button>
        <p class="text-sm text-gray-500">
          Note: You can only decrypt files compressed using this app.
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
