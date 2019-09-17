<script context="module">
  export const dataurl = ({job}) =>
    `commands?job_id=eq.${job}&type=eq.Update&select=*,measurements(*)`;
</script>

<script>
  export let name;
  export let command_line;
  export let working_directory;
  export let output;
  export let measurements = [];
</script>

<section class="section">
  <div class="container">
    <h1 class="title is-5">{name}</h1>
    <ul>
      <li>
        command_line:
        <code>{command_line}</code>
      </li>
      <li>working_directory: {working_directory}</li>
      {#each measurements as {name, value}}
        <li>{name}: {value}</li>
      {/each}
    </ul>
    <pre>
      <code>{output}</code>
    </pre>
  </div>
</section>
