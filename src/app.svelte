<script>
  import PageHeader from "./components/page-header.svelte";
  import PageFooter from "./components/page-footer.svelte";
  import Pagination from "./components/pagination.svelte";

  export let page = {props: {}};
  export let headers = [];
</script>

<PageHeader />

{#each headers as head}
  <svelte:component this={head.component} {...head.props} />
{/each}

<section class="section">
  <div class="container">
    <svelte:component this={page.component} {...page.props} />
  </div>
</section>

{#if page.props.pagination}
  <section class="section">
    <div class="container">
      <Pagination
        current={page.props.pagination.current}
        total={page.props.pagination.total} />
    </div>
  </section>
{/if}

<PageFooter />
