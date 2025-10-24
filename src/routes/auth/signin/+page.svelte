<!-- setup login page -->
<script>
  import { emailAuth } from '$lib/stores/firebase/auth'
  let email = ''
  let password = ''
  let errorMessage = ''
  let successMessage = ''
  let showPassword = false

  const login = async () => {
    errorMessage = ''
    successMessage = ''
    try {
      await emailAuth.signIn(email, password)
      successMessage = 'Sign in successful!'
    } catch (error) {
      errorMessage = error?.message || 'Login failed. Please try again.'
      console.error('Login failed:', error)
    }
  }
</script>

<!-- ui using daisyui -->
<div class="flex items-center justify-center flex-grow bg-base-200">
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Login</h2>
      {#if errorMessage}
        <div class="alert alert-error mb-4">
          <span>{errorMessage}</span>
        </div>
      {/if}
      {#if successMessage}
        <div class="alert alert-success mb-4 flex flex-col gap-2 font-bold">
          <span>{successMessage}</span>
          <a href="/" class="link">Go back to homepage</a>
        </div>
      {/if}
      <form on:submit|preventDefault={login}>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            bind:value={email}
            placeholder="Enter your email"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <div class="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              bind:value={password}
              placeholder="Enter your password"
              class="input input-bordered w-full pr-10"
              required
            />
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 btn-xs btn-ghost"
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
            </button>
          </div>
        </div>
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary"> Login </button>
        </div>
      </form>
      <div class="mt-4">
        <p>
          Don't have an account?
          <a href="/auth/signup" class="link link-primary">Register</a>
        </p>
      </div>
    </div>
  </div>
</div>
<!-- end of login page -->
