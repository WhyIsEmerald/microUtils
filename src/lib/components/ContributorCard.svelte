<script lang="ts">
  export let name: string
  export let contributions: number
  export let avatar: string

  export let github: string
</script>

<div class="card shadow-xl hover:shadow-2xl transition-shadow duration-300">
  <div class="card-body items-center text-center">
    <div class="avatar">
      <div
        class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
      >
        <img src={avatar} alt={`${name}'s avatar`} />
      </div>
    </div>
    <h2 class="card-title text-2xl mt-4">
      {name}
    </h2>
    <div class="badge badge-primary badge-lg">
      {contributions} contributions
    </div>

    <div class="card-actions mt-4">
      <a
        href={github}
        class="btn btn-outline btn-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Profile
      </a>
    </div>
  </div>
</div>
