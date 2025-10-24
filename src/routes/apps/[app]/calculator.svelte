<script lang="ts">
  import { Tokens } from '$lib/scripts/dataStructures'
  import { ShuntingYard } from '$lib/scripts/shuntingYard'
  import { solveRPN } from '$lib/scripts/calculator'

  let display = ''
  function append(val: string) {
    display += val
  }
  function clear() {
    display = ''
  }
  function calculate() {
    try {
      let tokens = new Tokens(display)
      let rpn = ShuntingYard(tokens)!
      display = solveRPN(rpn).toString()
    } catch {
      display = 'Error'
    }
  }
</script>

<div class="flex-grow flex flex-col items-center justify-center">
  <div class="bg-base-300 rounded-lg shadow p-6 w-72">
    <div
      class="mb-4 bg-accent rounded text-right px-3 py-2 text-xl font-mono min-h-[2.5rem] text-black"
    >
      {display || '0'}
    </div>
    <div class="grid grid-cols-4 gap-2">
      <button class="btn btn-primary" on:click={() => append('7')}>7</button>
      <button class="btn btn-primary" on:click={() => append('8')}>8</button>
      <button class="btn btn-primary" on:click={() => append('9')}>9</button>
      <button class="btn btn-warning" on:click={() => append('/')}>÷</button>
      <button class="btn btn-primary" on:click={() => append('4')}>4</button>
      <button class="btn btn-primary" on:click={() => append('5')}>5</button>
      <button class="btn btn-primary" on:click={() => append('6')}>6</button>
      <button class="btn btn-warning" on:click={() => append('*')}>×</button>
      <button class="btn btn-primary" on:click={() => append('1')}>1</button>
      <button class="btn btn-primary" on:click={() => append('2')}>2</button>
      <button class="btn btn-primary" on:click={() => append('3')}>3</button>
      <button class="btn btn-warning" on:click={() => append('-')}>−</button>
      <button class="btn btn-primary" on:click={() => append('0')}>0</button>
      <button class="btn btn-primary" on:click={() => append('.')}>.</button>
      <button
        class="btn btn-secondary"
        on:click={() => {
          display = display.slice(0, -1)
        }}>C</button
      >
      <button class="btn btn-warning" on:click={() => append('+')}>+</button>
      <button class="btn btn-secondary" on:click={() => append('(')}>(</button>
      <button class="btn btn-secondary" on:click={() => append(')')}>)</button>
      <button class="btn btn-secondary" on:click={clear}>AC</button>
      <button class="btn btn-warning" on:click={() => append('^')}>^</button>
    </div>
    <button class="btn btn-error w-full mt-4" on:click={calculate}>=</button>
  </div>
</div>
