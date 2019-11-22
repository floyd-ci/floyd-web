<script context="module">
  export const dataurl = ({job}) =>
    `diagnostics?job_id=eq.${job}&select=file_path,line_nr,type,message,option`;
  export const pagination = true;
</script>

<script>
  export let namespace;
  export let project;

  export let pagedata = [];

  $: slug = `${namespace}/${project}`;
</script>

{#each pagedata as {file_path, line_nr, type, message, option}}
  <div class="panel">
    <h1 class="panel-heading">{type} ({option})</h1>
    <div class="panel-block">
      <a href="/{slug}/tree/{file_path}#L{line_nr}">{file_path}:{line_nr}</a>
    </div>
    <pre class="panel-block">
      <code>{message}</code>
    </pre>
  </div>
{/each}
