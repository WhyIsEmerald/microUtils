<script lang="ts">
  import { user } from '$lib/stores/firebase/auth'
  import type { User } from 'firebase/auth'
  import EditProfileForm from '$lib/components/EditProfileForm.svelte'
  import DeleteAccountModal from '$lib/components/DeleteAccountModal.svelte'
  import { emailAuth } from '$lib/stores/firebase/auth'
  let signedOutMessage = ''
  let currentUser: User | null = null
  let username = ''
  let photoURL = ''
  let showDeleteModal = false

  // Subscribe to user store for automatic updates
  $: unsubscribe = user.subscribe(value => {
    currentUser = value
    username = currentUser?.displayName || ''
    photoURL = currentUser?.photoURL || ''
  })

  const handleSignOut = async () => {
    try {
      await emailAuth.signOut()
      signedOutMessage = 'You have been signed out.'
    } catch (error) {
      signedOutMessage = 'Sign out failed. Please try again.'
    }
  }
</script>

{#if currentUser}
  <div class="p-6 w-screen mx-auto max-w-lg">
    <h2 class="card-title text-2xl font-bold mb-4">Profile Settings</h2>
    <div class="divider"></div>
    <EditProfileForm
      {username}
      {photoURL}
      {currentUser}
      on:saved={() => {
        /* Optionally show a toast or reload user info */
      }}
    />
    <div class="divider divider-error mt-8 mb-4"></div>
    <h2 class="card-title text-xl font-bold mb-2">Danger Zone</h2>
    <div class="flex flex-col gap-2">
      <button class="btn btn-warning" on:click={handleSignOut}>Sign Out</button>
      <button class="btn btn-error" on:click={() => (showDeleteModal = true)}>
        Delete Account
      </button>
    </div>
  </div>
  <DeleteAccountModal
    show={showDeleteModal}
    {currentUser}
    on:cancel={() => (showDeleteModal = false)}
    on:deleted={() => {
      showDeleteModal = false
      // Optionally show a message or redirect
    }}
  />
{:else}
  <div class="alert alert-warning" style="text-align: center;">
    You are not signed in.
  </div>
{/if}
