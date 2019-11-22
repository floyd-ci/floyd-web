<script context="module">
  export const dataurl = ({namespace}) =>
    `projects?owner=eq.${namespace}&select=name,project_slug&order=name`;
  export const pagination = true;
</script>

<script>
  export let namespace;
  export let pagedata;
</script>

<svelte:head>
  <title>{namespace}</title>
</svelte:head>

<h1 class="title">{namespace}</h1>

<ul>
  {#each pagedata as {name, project_slug}}
    <li>
      <a href="/{project_slug}">{name}</a>
    </li>
  {/each}
</ul>
