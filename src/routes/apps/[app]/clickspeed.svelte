<script lang="ts">
  import { onDestroy } from 'svelte'

  let clicks = 0
  const DURATION = 5
  let timer = DURATION
  let cps = 0
  let testStarted = false
  let testOver = false
  let interval: ReturnType<typeof setInterval>

  function startTest() {
    clicks = 0
    timer = DURATION
    cps = 0
    testOver = false
    testStarted = true

    interval = setInterval(() => {
      timer--
      if (timer === 0) {
        endTest()
      }
    }, 1000)
  }

  function handleClick() {
    if (testStarted && timer > 0) {
      clicks++
    }
  }

  function endTest() {
    clearInterval(interval)
    testStarted = false
    testOver = true
    cps = clicks / DURATION
  }

  function resetTest() {
    clicks = 0
    timer = DURATION
    cps = 0
    testStarted = false
    testOver = false
  }

  onDestroy(() => {
    if (interval) {
      clearInterval(interval)
    }
  })
</script>

<div class="flex flex-col items-center justify-center flex-grow p-4">
  <div class="card w-full max-w-lg bg-base-100 shadow-xl">
    <div class="card-body items-center text-center">
      <h2 class="card-title text-3xl font-bold">Click Speed Test</h2>
      <p class="mb-4 text-base-content/70">
        Test your clicking speed. Click the button as many times as you can in {DURATION}
        seconds.
      </p>

      <div class="stats stats-vertical lg:stats-horizontal shadow my-4">
        <div class="stat">
          <div class="stat-title">Time Left</div>
          <div class="stat-value text-secondary">{timer}s</div>
        </div>
        <div class="stat">
          <div class="stat-title">Clicks</div>
          <div class="stat-value text-secondary">{clicks}</div>
        </div>
      </div>

      {#if !testStarted && !testOver}
        <button class="btn btn-primary btn-lg w-full mt-4" on:click={startTest}
          >Start Test</button
        >
      {:else if testStarted}
        <button
          class="btn btn-accent btn-lg w-full h-48 text-2xl"
          on:mousedown={handleClick}>Click!</button
        >
      {:else if testOver}
        <div class="text-center my-4 w-full">
          <h3 class="text-2xl font-semibold">Test Complete!</h3>
          <div class="stats bg-primary text-primary-content mt-4">
            <div class="stat">
              <div class="stat-title">Clicks per Second (CPS)</div>
              <div class="stat-value">{cps.toFixed(2)}</div>
              <div class="stat-desc">
                You clicked {clicks} times in {DURATION} seconds.
              </div>
            </div>
          </div>
          <button class="btn btn-secondary mt-6 w-full" on:click={resetTest}
            >Try Again</button
          >
        </div>
      {/if}
    </div>
  </div>
</div>
