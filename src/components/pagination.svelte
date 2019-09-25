<script>
  import PaginationEllipsis from "./pagination-ellipsis.svelte";
  import PaginationLink from "./pagination-link.svelte";

  export let current;
  export let total;

  const query = new URLSearchParams(location.search);

  const href = page => {
    query.set("page", page);
    return "?" + query.toString();
  };

  // TODO [>=1.0.0]: Consider rewriting this in pure JS, inherit from SvelteComponent.

  $: first = Math.max(1, Math.min(+current - 2, +total - 6));
  $: last = Math.min(total, Math.max(+current + 2, 1 + 6));
  $: range = new Array(1 + last - first).fill(first).map((x, y) => x + y);
</script>

<nav class="pagination is-centered" role="navigation" aria-label="pagination">

  {#if +current === 1}
    <span class="pagination-previous" disabled>Prev</span>
  {:else}
    <a class="pagination-previous" href={href(current - 1)}>Prev</a>
  {/if}

  {#if +current === +total}
    <span class="pagination-next" disabled>Next</span>
  {:else}
    <a class="pagination-next" href={href(+current + 1)}>Next</a>
  {/if}

  <ul class="pagination-list">

    {#if first > 1}
      <PaginationLink page="1" />
    {/if}

    {#if first === 3}
      <PaginationLink page="2" />
    {:else if first > 3}
      <PaginationEllipsis />
    {/if}

    <!-- for (var i = first; i <= last; ++i) -->
    {#each range as i, key (i)}
      {#if i === +current}
        <li>
          <span class="pagination-link is-current">{i}</span>
        </li>
      {:else}
        <PaginationLink page={i} />
      {/if}
    {/each}

    {#if last === total - 2}
      <PaginationLink page={total - 1} />
    {:else if last < total - 2}
      <PaginationEllipsis />
    {/if}

    {#if last < total}
      <PaginationLink page={total} />
    {/if}

  </ul>
</nav>
