<script context="module">
  export function dataurl({job}, query) {
    const search = new URLSearchParams({
      job_id: `eq.${job}`,
      type: "eq.Test",
      select: "command_id,name,duration,status",
    });
    if (query.has("status")) {
      search.set("status", "eq." + query.get("status"));
    }
    return "commands?" + search.toString();
  }
  export const pagination = true;
</script>

<script>
  export let namespace;
  export let project;
  export let job;

  export let pagedata = [];

  $: href = id => `/${namespace}/${project}/jobs/${job}/tests/${id}`;
</script>

<!-- show Test AND DynamicAnalysis -->

<table class="table is-striped is-hoverable is-fullwidth">
  <thead>
    <tr>
      <th>Name</th>
      <th>Duration</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {#each pagedata as {command_id, name, duration, status}}
      <tr>
        <th>
          <a href={href(command_id)}>{name}</a>
        </th>
        <td>{duration}</td>
        <td>{status}</td>
      </tr>
    {/each}
  </tbody>
</table>
