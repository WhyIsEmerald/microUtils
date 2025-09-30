<script>
  import { user } from '$lib/stores/firebase/auth'
  import { getUserNote, saveUserNote } from '$lib/stores/firebase/db'
  import { onMount } from 'svelte'
  let data = ''
  let saveStatus = ''
  let notSignedIn = true

  const MAX_NOTE_CHARS = 5120 // 10,240 bytes / 2 bytes per UTF-16 char ≈ 10 KB

  $: currentUser = $user
  $: notSignedIn = !currentUser

  // Fetch note whenever currentUser changes and is not null
  $: if (currentUser) {
    getUserNote(currentUser.uid).then(previousNote => {
      if (previousNote) {
        data = previousNote.content
      }
    })
  }

  async function saveNote() {
    if (data.length > MAX_NOTE_CHARS) {
      saveStatus = 'too_large'
      return
    }
    if (currentUser) {
      try {
        await saveUserNote(currentUser.uid, data)
        saveStatus = 'success'
      } catch (error) {
        console.error('Error saving note:', error)
        saveStatus = 'error'
      }
    } else {
      saveStatus = 'error'
    }
  }
</script>

<div class="flex justify-center items-center flex-col flex-grow">
  <h2 class="text-2xl font-bold">Notes</h2>
  <textarea
    class="textarea"
    placeholder="Write your note here...they are encrypted and only you can access it"
    bind:value={data}
  ></textarea>
  {#if notSignedIn}
    <div class="alert alert-warning" style="text-align: center;">
      You are not signed in.
    </div>
  {:else}
    <button class="btn btn-primary mt-4" on:click={saveNote}>
      Save Note
    </button>
    {#if saveStatus === 'success'}
      <div class="alert alert-success" style="text-align: center;">
        Note saved successfully!
      </div>
    {:else if saveStatus === 'error'}
      <div class="alert alert-error" style="text-align: center;">
        Failed to save note. Please try again.
      </div>
    {:else if saveStatus === 'too_large'}
      <div class="alert alert-error" style="text-align: center;">
        Note is too large (max 10 KB ≈ 5,120 characters). Please shorten your
        note.
      </div>
    {/if}
  {/if}
</div>
