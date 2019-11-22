<script context="module">
  export const dataurl = ({job}) =>
    `jobs?job_id=eq.${job}&select=*,site:sites(*),variables(*)`;
</script>

<script>
  export let site;
  export let variables;
</script>

<code>
  <pre>{JSON.stringify(site, null, '  ')}</pre>
  <pre>{JSON.stringify(variables, null, '  ')}</pre>
</code>
