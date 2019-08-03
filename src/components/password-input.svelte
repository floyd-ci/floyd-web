<script>
  import Icon from "../icons/lock.svelte";

  export let name;
  export let value;
  export let placeholder;
</script>

<div class="field">
  <p class="control has-icons-left">
    <input class="input" type="password" {name} bind:value {placeholder} />
    <Icon class="is-small is-left" />
  </p>
</div>
