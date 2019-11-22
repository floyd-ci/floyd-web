<script context="module">
  export const dataurl = ({namespace, project}) =>
    `rpc/site_project_stats` +
    `?project_slug=eq.${namespace}/${project}` +
    "&select=number_of_jobs,site:sites(name,os_name,logical_cpus,clock_frequency)";
  export const pagination = true;
</script>

<script>
  export let pagedata = [];
</script>

<table class="table is-striped is-hoverable is-fullwidth">
  <thead>
    <tr>
      <th>Site Name</th>
      <th>Processor Speed</th>
      <th># Processors</th>
    </tr>
  </thead>
  <tbody>
    {#each pagedata as {site}}
      <tr>
        <th scope="row">
          <a href="/sites/{site.name}">{site.name}</a>
        </th>
        <td>{site.clock_frequency}</td>
        <td>{site.logical_cpus}</td>
      </tr>
    {/each}
  </tbody>
</table>
