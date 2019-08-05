<script context="module">
  export const dataurl = ({service, namespace}) =>
    `projects` +
    `?namespace_slug=eq.${service}/${namespace}` +
    `&select=name,project_slug` +
    `&order=name`;
  export const pagination = true;
</script>

<script>
  export let service;
  export let namespace;
  export let pagedata;
</script>

<svelte:head>
  <title>{service} / {namespace}</title>
</svelte:head>

<h1 class="title">{service} / {namespace}</h1>

<ul>
  {#each pagedata as {name, project_slug}}
    <li>
      <a href="/{project_slug}">{name}</a>
    </li>
  {/each}
</ul>
