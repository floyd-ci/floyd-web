<script>
  export let service;
  export let namespace;
  export let project;
  export let segment;

  $: project_slug = `/${service}/${namespace}/${project}`;
</script>

<div class="hero is-small is-info is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        <span>{service}/</span>
        <a href="/{service}/{namespace}">{namespace}</a>
        <span>/</span>
        <a href={project_slug}>{project}</a>
      </h1>
    </div>
  </div>
  <div class="hero-foot">
    <div class="container">
      <nav class="tabs is-boxed">
        <ul>
          <li class={segment === undefined ? 'is-active' : ''}>
            <a href={project_slug}>Dashboard</a>
          </li>
          <li class={segment === 'graphs' ? 'is-active' : ''}>
            <a href="{project_slug}/graphs">Graphs</a>
          </li>
          <li class={segment === 'sites' ? 'is-active' : ''}>
            <a href="{project_slug}/sites">Sites</a>
          </li>
          <li class={segment === 'stats' ? 'is-active' : ''}>
            <a href="{project_slug}/stats">Stats</a>
          </li>
          <li class={segment === 'tests' ? 'is-active' : ''}>
            <a href="{project_slug}/tests">Tests</a>
          </li>
          <li class={segment === 'tree' ? 'is-active' : ''}>
            <a href="{project_slug}/tree/">Tree</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>
