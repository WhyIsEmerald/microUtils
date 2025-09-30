<script lang="ts">
  import TodoList from '$lib/components/TodoList.svelte'
  import { saveUserTodo, getUserTodo } from '$lib/stores/firebase/db'
  import { user } from '$lib/stores/firebase/auth'
  import { page } from '$app/stores'
  import { get } from 'svelte/store'
  import { onDestroy } from 'svelte'

  $: currentUser = $user
  $: notSignedIn = !currentUser

  const name = get(page).params.app || 'todo'

  let todos: { text: string; done: boolean }[] = []
  let newTodo = ''
  let loading = true
  let lastLoaded = ''
  let saveTimeout: NodeJS.Timeout
  let justLoaded = false // Prevent saving right after loading

  // Only load todos when user or list name changes
  $: if (currentUser && lastLoaded !== currentUser.uid + name) {
    lastLoaded = currentUser.uid + name
    loadTodos()
  }

  async function loadTodos() {
    loading = true
    try {
      if (!currentUser) return // Ensure currentUser is not null before proceeding
      const res = await getUserTodo(currentUser.uid)
      if (res && res.content) {
        todos = JSON.parse(res.content)
      } else {
        todos = []
      }
    } catch (e) {
      console.error('Failed to load todos:', e)
      todos = []
    }
    loading = false
    justLoaded = true
    setTimeout(() => {
      justLoaded = false
    }, 100) // Prevent immediate save
  }

  // Save todos to Firestore whenever they change (but not while loading or just loaded)
  $: if (currentUser && !loading && !justLoaded) {
    ;(todos, debounceSave())
  }

  function debounceSave() {
    clearTimeout(saveTimeout)
    saveTimeout = setTimeout(async () => {
      if (!currentUser) return
      try {
        await saveUserTodo(currentUser.uid, JSON.stringify(todos))
      } catch (e) {
        console.error('Failed to save todos:', e)
      }
    }, 500)
  }

  onDestroy(() => {
    clearTimeout(saveTimeout)
  })

  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { text: newTodo, done: false }]
      newTodo = ''
    }
  }

  function toggleTodo(idx: number) {
    todos = todos.map((todo, i) =>
      i === idx ? { ...todo, done: !todo.done } : todo
    )
  }

  function removeTodo(idx: number) {
    todos = todos.filter((_, i) => i !== idx)
  }

  function setNewTodo(val: string) {
    newTodo = val
  }
</script>

<div class="flex flex-col items-center w-full max-w-xl mx-auto py-8">
  {#if notSignedIn}
    <div class="alert alert-warning">You are not signed in.</div>
  {:else if loading}
    <span class="loading loading-spinner loading-lg"></span>
  {:else}
    <TodoList
      {todos}
      {newTodo}
      {addTodo}
      {toggleTodo}
      {removeTodo}
      {setNewTodo}
    />
  {/if}
</div>
