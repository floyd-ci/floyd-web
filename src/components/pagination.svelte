<script>
  export let current;
  export let total;

  const query = new URLSearchParams(location.search);

  const href = page => {
    query.set("page", page);
    return "?" + query.toString();
  };

  // TODO: Consider rewriting this in pure JS, inherit from SvelteComponent.

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
      <li>
        <a class="pagination-link" href={href(1)}>1</a>
      </li>
    {/if}

    {#if first === 3}
      <li>
        <a class="pagination-link" href={href(2)}>2</a>
      </li>
    {:else if first > 3}
      <li>
        <span class="pagination-ellipsis">...</span>
      </li>
    {/if}

    <!-- for (var i = first; i <= last; ++i) -->
    {#each range as i, key (i)}
      {#if i === +current}
        <li>
          <span class="pagination-link is-current">{i}</span>
        </li>
      {:else}
        <li>
          <a class="pagination-link" href={href(i)}>{i}</a>
        </li>
      {/if}
    {/each}

    <li>
      {#if last === total - 2}
        <a class="pagination-link" href={href(total - 1)}>{total - 1}</a>
      {:else if last < total - 2}
        <span class="pagination-ellipsis">...</span>
      {/if}
    </li>

    {#if last < total}
      <li>
        <a class="pagination-link" href={href(total)}>{total}</a>
      </li>
    {/if}

  </ul>
</nav>
