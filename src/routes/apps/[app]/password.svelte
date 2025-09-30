<script lang="ts">
  import { generatePassword } from '$lib/scripts/passwordGenerator'
  let password = ''
  let passwordLength = 10
  let passwordStrength = 10
  let passwordOptions = {
    hasNumbers: false,
    hasSymbols: false,
    upperCase: false,
    lowerCase: false
  }
  let error = ''
</script>

<div class="hero bg-base-200 flex-grow">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Password Manager</h1>
      <p class="py-6">Generate a secure, random password.</p>
      <div class="card card-dash bg-base-100 w-full">
        <div class="card-body">
          <h2 class="card-title">
            <label class="floating-label w-full">
              <input
                type="text"
                placeholder="Password"
                class="input w-full"
                bind:value={password}
              />
              <span>Password</span>
            </label>

            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
              class="btn btn-square"
              on:click={() => navigator.clipboard.writeText(password)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
                ><path
                  d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
                /></svg
              >
            </button>
          </h2>
          <progress
            id="password-strength"
            value={passwordStrength}
            class="progress progress-secondary"
            max="100"
          ></progress>
          <p class="label mb-1">Strength</p>

          Password Length : {passwordLength}
          <input
            type="range"
            min="0"
            max="256"
            bind:value={passwordLength}
            class="range range-secondary w-full"
          />

          <div class="grid grid-cols-2 gap-4">
            <div class="flex">
              UpperCase Letters
              <input
                type="checkbox"
                bind:checked={passwordOptions.upperCase}
                class="toggle toggle-secondary ml-auto"
              />
            </div>
            <div class="flex">
              LowerCase Letters
              <input
                type="checkbox"
                bind:checked={passwordOptions.lowerCase}
                class="toggle toggle-secondary ml-auto"
              />
            </div>
            <div class="flex">
              Numbers
              <input
                type="checkbox"
                bind:checked={passwordOptions.hasNumbers}
                class="toggle toggle-secondary ml-auto"
              />
            </div>
            <div class="flex">
              Symbols
              <input
                type="checkbox"
                bind:checked={passwordOptions.hasSymbols}
                class="toggle toggle-secondary ml-auto"
              />
            </div>
          </div>
          <div class="card-actions justify-center">
            <button
              class="btn btn-primary w-full"
              on:click={() => {
                error = ''
                password = ''
                try {
                  password = generatePassword(passwordLength, passwordOptions)
                } catch (e) {
                  error = e.message
                }
                passwordStrength = password.length
              }}>Generate</button
            >
          </div>
          {#if error != ''}
            <div class="alert alert-error shadow-lg w-full">
              <div class="flex flex-row items-center">
                <span>{error}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
