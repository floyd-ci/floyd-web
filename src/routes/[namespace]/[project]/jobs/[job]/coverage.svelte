<script context="module">
  export const dataurl = ({job}) =>
    `coverage?job_id=eq.${job}&select=file_path,lines_tested,lines_untested`;
  export const pagination = true;
</script>

<script>
  export let namespace;
  export let project;

  export let pagedata = [];

  $: root = `/${namespace}/${project}/tree`;

  const coverage_percent = (tested, untested) =>
    ((100 * tested) / (tested + untested)).toFixed(2);
</script>

<table class="table is-striped is-hoverable is-fullwidth">
  <thead>
    <tr>
      <th>File Name</th>
      <th>Line coverage</th>
      <th>Lines covered</th>
    </tr>
  </thead>
  <tbody>
    {#each pagedata as {file_path, lines_tested, lines_untested}}
      <tr>
        <td>
          <a href="{root}/{file_path}">{file_path}</a>
        </td>
        <td>{coverage_percent(lines_tested, lines_untested)} %</td>
        <td>{lines_tested} / {lines_tested + lines_untested}</td>
      </tr>
    {/each}
  </tbody>
</table>
