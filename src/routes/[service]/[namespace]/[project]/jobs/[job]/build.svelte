<script context="module">
  export const dataurl = ({job}) =>
    `commands?job_id=eq.${job}&type=eq.Build&select=*,measurements(name,value)`;
  export const pagination = true;
</script>

<script>
  export let service;
  export let namespace;
  export let project;

  export let pagedata = [];
</script>

{#each pagedata as elem}
  <div class="panel">
    <h1 class="panel-heading">{elem.name}</h1>
    <div class="panel-block">
      <p>
        command_line:
        <code>{elem.command_line}</code>
      </p>
    </div>
    <div class="panel-block">
      <p>working_directory: {elem.working_directory}</p>
    </div>
    {#each elem.measurements as {name, value}}
      <div class="panel-block">
        {#if name === 'SourceFile'}
          <p>
            {name}:
            <a href="/{service}/{namespace}/{project}/tree/{value}">{value}</a>
          </p>
        {:else}
          <p>{name}: {value}</p>
        {/if}
      </div>
    {/each}
    <pre class="panel-block">
      <code>{elem.output}</code>
    </pre>
  </div>
{/each}
