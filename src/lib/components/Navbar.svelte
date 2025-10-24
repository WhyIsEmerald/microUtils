<script lang="ts">
  import { page } from '$app/stores'
  import { user } from '$lib/stores/firebase/auth'
  import { onDestroy } from 'svelte'
  let currentUser = null

  // Subscribe to user store for automatic updates and cleanup
  const unsubscribe = user.subscribe(value => {
    currentUser = value
  })

  onDestroy(() => {
    unsubscribe()
  })
</script>

<div class="navbar bg-base-200 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown lg:hidden">
      <div tabindex="0" role="button" class="btn btn-ghost">
        <img src="/favicon.png" class="w-[1.5rem] h-[1.5rem]" alt="" />
      </div>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li><a href="/">Home</a></li>
        <li>
          <a
            href="/apps"
            class={$page.url.pathname === '/apps'
              ? 'active text-amber-500'
              : ''}>Apps</a
          >
        </li>
        <li>
          <a
            href="/about"
            class={$page.url.pathname === '/about'
              ? 'active text-amber-500'
              : ''}>About</a
          >
        </li>
        <li>
          <a
            href="/log"
            class={$page.url.pathname === '/log' ? 'active text-amber-500' : ''}
            >Log</a
          >
        </li>
      </ul>
    </div>

    <div class="btn btn-ghost text-xl text-white hidden lg:flex">
      <img class="w-[1.5rem] h-[1.5rem]" src="/favicon.png" alt="" />
      <p>microUtils</p>
    </div>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1 text-md font-bold">
      <li>
        <a
          href="/"
          class={$page.url.pathname === '/' ? 'active text-amber-500' : ''}
          >Home</a
        >
      </li>
      <li>
        <a
          href="/apps"
          class={$page.url.pathname === '/apps' ? 'active text-amber-500' : ''}
          >Apps</a
        >
      </li>
      <li>
        <a
          href="/about"
          class={$page.url.pathname === '/about' ? 'active text-amber-500' : ''}
          >About</a
        >
      </li>
      <li>
        <a
          href="/log"
          class={$page.url.pathname === '/log' ? 'active text-amber-500' : ''}
          >Log</a
        >
      </li>
    </ul>
  </div>
  <div class="navbar-end grid grid-flow-col gap-2">
    <!-- show avatar if signed in else show login button use daisyui -->
    {#if currentUser}
      <a class="avatar avatar-placeholder" href="/user/profile">
        <div
          class="w-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center"
        >
          {#if currentUser.photoURL}
            <img src={currentUser.photoURL} alt="avatar" />
          {:else if currentUser.displayName}
            <span class="text-lg font-bold"
              >{currentUser.displayName.charAt(0).toUpperCase()}</span
            >
          {:else if currentUser.email}
            <span class="text-lg font-bold"
              >{currentUser.email.charAt(0).toUpperCase()}</span
            >
          {:else}
            <span class="text-lg font-bold">U</span>
          {/if}
        </div>
      </a>
    {:else}
      <a class="btn bg-white text-black border-[#e5e5e5]" href="/auth/signin">
        <svg
          aria-label="Email icon"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            stroke="black"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </g>
        </svg>
        Login with Email
      </a>
    {/if}

    <a
      class=" w-10 h-10 hover:bg-base-200 flex items-center justify-center"
      href="https://github.com/emerald-developer/appKit"
    >
      <!-- svelte-ignore a11y_missing_attribute -->
      <img src="/github.svg" width="24" height="24" alt="GitHub Logo" />
    </a>
  </div>
</div>
