<script lang="ts">
  /**
   * Generates a time-based greeting (Good morning, Good afternoon, or Good evening).
   *
   * @returns {string} The time-based greeting followed by an exclamation mark.
   */

  function greeting() {
    const now = new Date()
    const hours = now.getHours()

    let timeBasedGreeting: string
    if (hours < 12) {
      timeBasedGreeting = 'Good morning'
    } else if (hours < 18) {
      timeBasedGreeting = 'Good afternoon'
    } else {
      timeBasedGreeting = 'Good evening'
    }
    return `${timeBasedGreeting}!`
  }
</script>

<div class="hero flex-grow" style="background-image: url(/blob-scene.svg);">
  <div class="hero-overlay"></div>
  <div class="hero-content text-neutral-content text-center">
    <div
      class="max-w-md motion-translate-y-in-100 motion-ease-bounce motion-blur-in-md"
    >
      <h1
        class="mb-5 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%] animate-gradient"
      >
        {greeting()}
      </h1>
      <p class="mb-5">
        Explore our curated collection of elegant Svelte applications,
        thoughtfully designed to enhance your digital workflow with modern,
        efficient solutions.
      </p>
      <a href="/apps">
        <button
          class="btn btn-dash btn-accent motion-preset-oscillate-lg motion-paused hover:motion-running"
        >
          Explore Apps
        </button>
      </a>
    </div>
  </div>
</div>

<style>
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-move 3s ease-in-out infinite;
  }

  @keyframes gradient-move {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
