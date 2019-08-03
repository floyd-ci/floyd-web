<script>
  import Icon from "../icons/email.svelte";

  export let name;
  export let value;
  export let placeholder;
</script>

<div class="field">
  <p class="control has-icons-left">
    <input class="input" type="email" {name} bind:value {placeholder} />
    <Icon class="is-small is-left" />
  </p>
</div>
