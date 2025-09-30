<script lang="ts">
  import { onMount } from 'svelte'
  import ContributorCard from '$lib/components/ContributorCard.svelte'

  let contributors: {
    name: string
    contributions: number
    avatar: string
    github: string
  }[] = []

  onMount(async () => {
    const res = await fetch(
      'https://api.github.com/repos/emerald-developer/appKit/contributors'
    )
    const data = await res.json()
    contributors = data.map((contributor: any) => ({
      name: contributor.login,
      contributions: contributor.contributions,
      avatar: contributor.avatar_url,
      github: contributor.html_url,
      linesAdded: 0,
      linesRemoved: 0
    }))
  })
</script>

<div class="min-h-screen bg-base-100">
  <div class="container mx-auto px-4 py-8">
    <div class="hero bg-base-100 mb-8">
      <div class="hero-content bg-base-100 text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">About MicroUtils</h1>
          <p class="py-6">
            MicroUtils is a collection of everyday applications built with
            SvelteKit. It aims to provide useful tools and utilities in a
            single, easy-to-use package.
          </p>
          <a
            href="https://github.com/emerald-developer/appKit"
            class="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/github.svg" alt="GitHub" class="w-6 h-6 mr-2" />
            View on GitHub
          </a>
        </div>
      </div>
    </div>

    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4">Our Contributors</h2>
      <p class="text-lg text-base-content/80">
        A big thank you to all the developers who have contributed to
        MicroUtils!
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each contributors as contributor}
        <ContributorCard
          name={contributor.name}
          contributions={contributor.contributions}
          avatar={contributor.avatar}
          github={contributor.github}
        />
      {/each}
    </div>

    <div class="text-center mt-16">
      <h3 class="text-3xl font-bold mb-4">Want to contribute?</h3>
      <p class="text-lg text-base-content/80 mb-6">
        MicroUtils is open-source and we welcome contributions of all kinds.
      </p>
      <a
        href="https://github.com/emerald-developer/appKit/blob/main/CONTRIBUTING.md"
        class="btn btn-lg btn-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn How to Contribute
      </a>
    </div>
  </div>
</div>
