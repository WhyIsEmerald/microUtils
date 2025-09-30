<script lang="ts">
  import Badge from './Badge.svelte'
  export let badgeType:
    | 'utility'
    | 'business'
    | 'math'
    | 'health'
    | 'education'
    | 'finance'
    | 'productivity'
    | 'fun'
  export let cardTitle: string
  export let cardDescription: string
</script>

<div class="p-0.5 rounded-lg flex animate-conic-gradient">
  <div class="card lg:card-side bg-base-200 w-full shadow-sm h-64">
    <div class="card-body">
      <h2 class="card-title text-3xl font-bold">
        {cardTitle}
      </h2>
      <p class="text-xl">{cardDescription}</p>
      <Badge {badgeType} />
      <div class="card-actions justify-end">
        <button class="btn btn-primary btn-dash">Run</button>
      </div>
    </div>
  </div>
</div>

<style>
  .animate-conic-gradient {
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
    /* Remove animation from container */
  }

  .animate-conic-gradient::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    background: conic-gradient(
      from 0deg,
      var(--fallback-b1, #181a20) 0deg,
      var(--fallback-s, #a6f472) 120deg,
      var(--fallback-s, #873efd) 360deg
    );
    animation: conic-rotate 4s linear infinite;
  }

  /* Ensure card content is above the gradient */
  .animate-conic-gradient > * {
    position: relative;
    z-index: 1;
  }

  @keyframes conic-rotate {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
