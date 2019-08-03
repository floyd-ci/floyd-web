<script>
  let class_name = "";
  export let viewBox = "0 0 512 512";
  export let d;
  export {class_name as class};
</script>

<style>
  svg {
    height: 1em;
  }
</style>

<svelte:options immutable={true} />

<span class="icon {class_name}">
  <svg aria-hidden="true" role="img" {viewBox}>
    <path fill="currentColor" {d} />
  </svg>
</span>
