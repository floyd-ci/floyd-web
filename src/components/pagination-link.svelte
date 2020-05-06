<script>
  export let page;

  $: href = (function () {
    const query = new URLSearchParams(location.search);
    query.set("page", page);
    return "?" + query.toString();
  })();
</script>

<li>
  <a class="pagination-link" {href}>{page}</a>
</li>
