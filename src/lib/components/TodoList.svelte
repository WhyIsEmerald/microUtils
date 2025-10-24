<script lang="ts">
  export let todos: { text: string; done: boolean }[] = []
  export let newTodo: string
  export let addTodo: () => void
  export let toggleTodo: (idx: number) => void
  export let removeTodo: (idx: number) => void
  export let setNewTodo: (val: string) => void
</script>

<div class="card w-full bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title text-2xl mb-4">Todo List</h2>
    <div class="flex w-full gap-2 mb-4">
      <input
        class="input input-bordered flex-grow"
        type="text"
        placeholder="Add a new todo"
        bind:value={newTodo}
        on:input={e => setNewTodo(e.target.value)}
        on:keydown={e => e.key === 'Enter' && addTodo()}
      />
      <button class="btn btn-primary" on:click={addTodo}>Add</button>
    </div>
    <ul class="w-full">
      {#each todos as todo, idx}
        <li
          class="flex items-center justify-between mb-2 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition"
        >
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              class="checkbox checkbox-primary"
              checked={todo.done}
              on:change={() => toggleTodo(idx)}
            />
            <span
              class={todo.done ? 'line-through text-gray-400' : 'font-medium'}
            >
              {todo.text}
            </span>
          </label>
          <button
            class="btn btn-xs btn-error btn-outline"
            on:click={() => removeTodo(idx)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
      {/each}
      {#if todos.length === 0}
        <li class="text-center text-gray-400 mt-8">No todos yet!</li>
      {/if}
    </ul>
  </div>
</div>
