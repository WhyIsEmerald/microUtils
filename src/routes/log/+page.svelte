<script lang="ts">
    export let data: {
        commits: {
            hash: string;
            date: string;
            message: string;
            isMerge: boolean;
        }[];
    };
</script>

<div class="flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl font-bold text-center mb-8">Changelog</h1>
    <ul
        class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
    >
        {#each data.commits as commit, i}
            <li>
                <div class="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5 {commit.isMerge
                            ? 'text-primary'
                            : 'text-secondary'}"
                        ><path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clip-rule="evenodd"
                        /></svg
                    >
                </div>
                <div
                    class:timeline-start={i % 2 === 0}
                    class:md:text-end={i % 2 === 0}
                    class:timeline-end={i % 2 !== 0}
                    class="mb-10"
                >
                    <time class="font-mono italic text-white"
                        >{commit.date}</time
                    >
                    <div class="text-lg font-black break-words max-w-xs">
                        {commit.message}
                    </div>
                    <div class="text-sm text-accent">
                        {commit.hash}
                        {#if commit.isMerge}<span
                                class="badge badge-primary badge-sm">Merge</span
                            >{/if}
                    </div>
                </div>
                <hr />
            </li>
        {/each}
    </ul>
</div>
