<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { emailAuth } from '$lib/stores/firebase/auth'
  import { getAuth, deleteUser } from 'firebase/auth'
  import { getFirestore, doc, deleteDoc } from 'firebase/firestore'
  import { get } from 'svelte/store'
  import { firebaseStore } from '$lib/stores/firebase/firebase'
  export let show = false
  export let currentUser: any = null

  let confirmEmail = ''
  let confirmPassword = ''
  let confirmError = ''
  let deleteMessage = ''
  let showPassword = false

  const dispatch = createEventDispatcher()

  const handleConfirm = async () => {
    confirmError = ''
    deleteMessage = ''
    if (!confirmEmail || !confirmPassword) {
      confirmError = 'Please enter your email and password.'
      return
    }
    try {
      const auth = getAuth()
      if (!auth.currentUser) {
        confirmError = 'No authenticated user.'
        return
      }
      await emailAuth.reauthenticate(
        auth.currentUser,
        confirmEmail,
        confirmPassword
      )
      const uid = auth.currentUser.uid
      const db = getFirestore(get(firebaseStore).app)

      // Delete all associated user data from Firestore before deleting the user account.
      await deleteDoc(doc(db, 'users', uid, 'note', 'data'))
      await deleteDoc(doc(db, 'users', uid, 'todo', 'data'))
      await deleteDoc(doc(db, 'users', uid))

      await deleteUser(auth.currentUser)
      deleteMessage = 'Your account has been deleted.'
      dispatch('deleted')
    } catch (error: any) {
      confirmError =
        error?.message ||
        'Failed to delete account. Please check your credentials.'
    }
  }
</script>

{#if show}
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-error">Delete Account</h3>
      <p class="py-2">
        <span class="text-error font-bold">This action cannot be undone.</span>
        <br />
        Please type your email and password to confirm account deletion.
      </p>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          type="email"
          class="input input-bordered"
          bind:value={confirmEmail}
          placeholder="Enter your email"
        />
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <div class="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            class="input input-bordered w-full pr-10"
            bind:value={confirmPassword}
            placeholder="Enter your password"
          />
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 btn-xs btn-ghost"
            tabindex="-1"
            on:click={() => (showPassword = !showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {#if showPassword}
              <!-- Visible icon -->
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
              <!-- Hidden icon -->
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
      {#if confirmError}
        <div class="alert alert-error mb-2">
          <span>{confirmError}</span>
        </div>
      {/if}
      {#if deleteMessage}
        <div class="alert alert-success mb-2">
          <span>{deleteMessage}</span>
        </div>
      {/if}
      <div class="modal-action">
        <button class="btn" on:click={() => dispatch('cancel')}>
          Cancel
        </button>
        <button class="btn btn-error" on:click={handleConfirm}>
          Confirm Delete
        </button>
      </div>
    </div>
  </div>
{/if}
