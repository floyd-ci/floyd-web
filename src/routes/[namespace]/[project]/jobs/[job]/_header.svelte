<script>
  export let namespace;
  export let project;
  export let job;

  export let segment;

  $: slug = `/${namespace}/${project}/jobs/${job}`;
  $: active = value => (segment === value ? "is-active" : null);
</script>

<nav class="navbar has-shadow">
  <div class="container">
    <div class="navbar-tabs">
      <a href={slug} class="navbar-item is-tab {active(undefined)}">Overview</a>
      <a href="{slug}/update" class="navbar-item is-tab {active('update')}">
        Update
      </a>
      <a
        href="{slug}/configure"
        class="navbar-item is-tab {active('configure')}">
        Configure
      </a>
      <a href="{slug}/build" class="navbar-item is-tab {active('build')}">
        Build
      </a>
      <a href="{slug}/tests" class="navbar-item is-tab {active('tests')}">
        Tests
      </a>
      <a href="{slug}/issues" class="navbar-item is-tab {active('issues')}">
        Issues
      </a>
      <a href="{slug}/coverage" class="navbar-item is-tab {active('coverage')}">
        Coverage
      </a>
    </div>
  </div>
</nav>
