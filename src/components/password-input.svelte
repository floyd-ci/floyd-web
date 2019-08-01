<script>
  export let name;
  export let value;
  export let placeholder;
</script>

<div class="field">
  <p class="control has-icons-left">
    <input class="input" type="password" {name} bind:value {placeholder} />
    <span class="icon is-small is-left">
      <svg
        style="height: 1em"
        aria-hidden="true"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">
        <path
          fill="currentColor"
          d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5
          0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5
          48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72
          32.3 72 72v72z" />
      </svg>
    </span>
  </p>
</div>
