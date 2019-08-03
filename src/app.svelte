<script>
  import PageHeader from "./components/page-header.svelte";
  import PageFooter from "./components/page-footer.svelte";

  export let page = null;
  export let props = null;
</script>

<PageHeader />

<section class="section">
  <div class="container">
    <svelte:component this={page} {...props} />
  </div>
</section>

<PageFooter />
