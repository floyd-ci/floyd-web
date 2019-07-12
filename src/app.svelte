<script>
  import PageHeader from "./components/page-header.svelte";
  import PageFooter from "./components/page-footer.svelte";

  export let page;
</script>

<PageHeader />

<section class="section">
  <div class="container">
    <svelte:component this={page} />
  </div>
</section>

<PageFooter />
