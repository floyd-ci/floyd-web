<script context="module">
  export const dataurl = ({service, namespace, project}) =>
    `jobs?project_slug=eq.${service}/${namespace}/${project}` +
    `&select=*,configure_warnings,configure_errors,build_warnings,build_errors,tests_notrun,tests_passed,tests_failed,site:sites(site_id,name)` +
    `&order=submit_time.desc`;
  export const pagination = true;
</script>

<script>
  export let service;
  export let namespace;
  export let project;

  export let pagedata = [];

  $: jobs = `/${service}/${namespace}/${project}/jobs`;
</script>

<table class="table is-bordered is-striped is-hoverable is-fullwidth">
  <thead>
    <tr>
      <th rowspan="2" style="vertical-align: bottom;">Site</th>
      <th rowspan="2" style="vertical-align: bottom;">Build Name</th>
      <!-- <th>Update</th> -->
      <th colspan="2" style="text-align: center;">Configure</th>
      <th colspan="2" style="text-align: center;">Build</th>
      <th colspan="3" style="text-align: center;">Test</th>
      <th rowspan="2" style="vertical-align: bottom;">Submit Time</th>
    </tr>
    <tr>
      <th>Warnings</th>
      <th>Errors</th>
      <th>Warnings</th>
      <th>Errors</th>
      <th>Not Run</th>
      <th>Failed</th>
      <th>Passed</th>
    </tr>
  </thead>
  <tbody>
    {#each pagedata as elem}
      <tr>
        <td>
          <a href="/sites/{elem.site.name}">{elem.site.name}</a>
        </td>
        <td>
          <a href="{jobs}/{elem.job_id}">{elem.build_name}</a>
        </td>
        <td>
          <a href="{jobs}/{elem.job_id}/configure">{elem.configure_warnings}</a>
        </td>
        <td>
          <a href="{jobs}/{elem.job_id}/configure">{elem.configure_errors}</a>
        </td>
        <td>
          <a href="{jobs}/{elem.job_id}/build">{elem.build_warnings}</a>
        </td>
        <td>
          <a href="{jobs}/{elem.job_id}/build">{elem.build_errors}</a>
        </td>
        <td>
          <a href="{jobs}/{elem.job_id}/tests?status=NotRun">
            {elem.tests_notrun}
          </a>
        </td>
        <td>
          <a href="{jobs}/{elem.job_id}/tests?status=Failed">
            {elem.tests_failed}
          </a>
        </td>
        <td>
          <a href="{jobs}/{elem.job_id}/tests?status=Passed">
            {elem.tests_passed}
          </a>
        </td>
        <td>{elem.submit_time}</td>
      </tr>
    {/each}
  </tbody>
</table>
