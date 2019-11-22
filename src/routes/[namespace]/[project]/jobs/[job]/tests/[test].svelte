<script context="module">
  export const dataurl = ({test}) =>
    `commands?command_id=eq.${test}&select=*,measurements(*)`;
</script>

<script>
  export let name;
  export let command_line;
  export let working_directory;
  export let output;
  export let measurements = [];
</script>

<div class="panel">
  <h1 class="panel-heading">{name}</h1>
  <div class="panel-block">
    <p>
      command_line:
      <code>{command_line}</code>
    </p>
  </div>
  <div class="panel-block">
    <p>working_directory: {working_directory}</p>
  </div>
  {#each measurements as {name, value}}
    <div class="panel-block">
      <p>{name}: {value}</p>
    </div>
  {/each}
  <pre class="panel-block">
    <code>{output}</code>
  </pre>
</div>
