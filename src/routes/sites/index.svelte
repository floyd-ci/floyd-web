<script context="module">
  export const dataurl = () =>
    `sites?select=name,os_name,logical_cpus,clock_frequency`;
  export const pagination = true;
</script>

<script>
  export let pagedata = [];
</script>

<div class="hero is-small is-info is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">Site Index</h1>
    </div>
  </div>
</div>

<section class="section">
  <div class="container">
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Site Name</th>
          <th>Processor Speed</th>
          <th># Processors</th>
        </tr>
      </thead>
      <tbody>
        {#each pagedata as site}
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
  </div>
</section>
