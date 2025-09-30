<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { getAuth, updateProfile } from 'firebase/auth'
  export let username: string = ''
  export let photoURL: string = ''
  export let currentUser: any = null

  let localUsername = username
  let localPhotoURL = photoURL
  let errorMessage = ''
  let saveMessage = ''

  const dispatch = createEventDispatcher()

  const handleSave = async () => {
    errorMessage = ''
    saveMessage = ''
    if (!localUsername.trim()) {
      errorMessage = 'Username is required.'
      return
    }
    try {
      const auth = getAuth()
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: localUsername,
          photoURL: localPhotoURL
        })
      }
      saveMessage = 'Profile updated!'
      dispatch('saved', { username: localUsername, photoURL: localPhotoURL })
    } catch (error) {
      errorMessage = 'Failed to update profile.'
    }
  }
</script>

{#if errorMessage}
  <div class="alert alert-error mb-4"><span>{errorMessage}</span></div>
{/if}
{#if saveMessage}
  <div class="alert alert-success mb-4"><span>{saveMessage}</span></div>
{/if}
<form on:submit|preventDefault={handleSave} class="flex flex-col gap-4">
  <div class="form-control">
    <label class="label">
      <span class="label-text">Username <span class="text-error">*</span></span>
    </label>
    <input
      type="text"
      bind:value={localUsername}
      class="input input-bordered"
      required
    />
  </div>
  <div class="form-control">
    <label class="label">
      <span class="label-text">Photo URL</span>
    </label>
    <input
      type="url"
      bind:value={localPhotoURL}
      class="input input-bordered"
      placeholder="Paste your avatar image URL"
    />
    {#if localPhotoURL}
      <div class="mt-2 flex justify-center">
        <img
          src={localPhotoURL}
          alt="Avatar Preview"
          class="w-20 h-20 rounded-full border"
        />
      </div>
    {/if}
  </div>
  <div class="form-control">
    <button type="submit" class="btn btn-primary">Save Changes</button>
  </div>
</form>
