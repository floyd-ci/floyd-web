<script context="module">
  export const dataurl = ({site}) =>
    `sites?name=eq.${site}&select=*,jobs(*),projects(*)`;
</script>

<script>
  export let name;
  export let hostname;
  export let os_name;
  export let os_release;
  export let os_version;
  export let os_platform;
  export let is64bit;
  export let processor_vendor;
  export let processor_vendor_id;
  export let processor_family;
  export let processor_model;
  export let cache_size;
  export let logical_cpus;
  export let physical_cpus;
  export let virtual_memory;
  export let physical_memory;
  export let clock_frequency;
  export let created;
  export let updated;
</script>

<div class="hero is-small is-info is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">Site: {name}</h1>
    </div>
  </div>
</div>

<section class="section">
  <div class="container">
    <ol>
      <li>name: {name}</li>
      <li>hostname: {hostname}</li>
      <li>os_name: {os_name}</li>
      <li>os_release: {os_release}</li>
      <li>os_version: {os_version}</li>
      <li>os_platform: {os_platform}</li>
      <li>is64bit: {is64bit}</li>
      <li>processor_vendor: {processor_vendor}</li>
      <li>processor_vendor_id: {processor_vendor_id}</li>
      <li>processor_family: {processor_family}</li>
      <li>processor_model: {processor_model}</li>
      <li>cache_size: {cache_size}</li>
      <li>logical_cpus: {logical_cpus}</li>
      <li>physical_cpus: {physical_cpus}</li>
      <li>virtual_memory: {virtual_memory}</li>
      <li>physical_memory: {physical_memory}</li>
      <li>clock_frequency: {clock_frequency}</li>
      <li>created: {created}</li>
      <li>updated: {updated}</li>
    </ol>
  </div>
</section>
