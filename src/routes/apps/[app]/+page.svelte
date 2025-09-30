<script lang="ts">
  import { page } from '$app/state'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  let app = page.params.app
  import Bmi from './bmi.svelte'
  import Compress from './compress.svelte'
  import Note from './note.svelte'
  import Currency from './currency.svelte'
  import Calculator from './calculator.svelte'
  import ClickSpeed from './clickspeed.svelte'
  import Encrypt from './encrypt.svelte'
  import Randomize from './randomize.svelte'
  import ColorPicker from './colorpicker.svelte'
  import Password from './password.svelte'

  onMount(() => {
    if (
      ![
        'bmi',
        'colorpicker',
        'note',
        'randomize',
        'todo',
        'clickspeed',
        'compress',
        'currency',
        'calculator',
        'qrcode',
        'expense',
        'encrypt',
        'password'
      ].includes(app)
    ) {
      goto('/errors/404')
    }
  })
</script>

{#if app == 'bmi'}
  <Bmi />
{:else if app == 'note'}
  <Note />
{:else if app == 'password'}
  <Password />
{:else if app == 'compress'}
  <Compress />
{:else if app == 'encrypt'}
  <Encrypt />
{:else if app == 'colorpicker'}
  <ColorPicker />
{:else if app == 'clickspeed'}
  <ClickSpeed />
{:else if app == 'randomize'}
  <Randomize />
{:else if app == 'currency'}
  <Currency />
{:else if app == 'calculator'}
  <Calculator />
{:else if app == 'todo'}
  <Todo />
{:else if app == 'qrcode'}
  <div class="flex flex-col items-center justify-center flex-grow">
    <div class="text-7xl font-bold text-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="inline w-16 h-16 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M4 4h16v16H4V4z"
        />
      </svg>
      Under Construction
    </div>
    <div class="mt-4 text-lg text-base-content/70">
      The QR Code Generator app is being built. Please check back soon!
    </div>
    <a href="/apps" class="btn btn-outline btn-warning mt-6">Back to Apps</a>
  </div>
{:else if app == 'expense'}
  <div class="flex flex-col items-center justify-center flex-grow">
    <div class="text-7xl font-bold text-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="inline w-16 h-16 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M4 4h16v16H4V4z"
        />
      </svg>
      Under Construction
    </div>
    <div class="mt-4 text-lg text-base-content/70">
      The Expense Tracker app is being built. Please check back soon!
    </div>
    <a href="/apps" class="btn btn-outline btn-warning mt-6">Back to Apps</a>
  </div>
{/if}
