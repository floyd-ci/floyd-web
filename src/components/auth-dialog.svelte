<script>
  import {md5} from "../md5";

  export let email;

  $: key = md5(email);
</script>

<style>
  .avatar {
    margin-top: -5rem;
    padding-bottom: 1rem;
  }

  .avatar img {
    padding: 0.4em;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    height: 110px;
    width: 110px;
  }
</style>

<div class="has-text-centered">
  <div class="column is-4 is-offset-4">

    <h1 class="title has-text-grey">
      <slot name="title" />
      !
    </h1>
    <h2 class="subtitle has-text-grey">
      <slot name="subtitle" />
    </h2>

    <div class="box" style="margin-top: 5rem">
      <figure class="avatar">
        <img alt="" src="https://www.gravatar.com/avatar/{key}?s=96&d=mp" />
      </figure>
      <form on:submit|preventDefault>
        <slot />
        <button type="submit" class="button is-block is-primary is-fullwidth">
          <slot name="submit">Continue</slot>
        </button>
      </form>
    </div>

    <div class="level has-text-grey">
      <div class="level-left">
        <slot name="bottom-left" />
      </div>
      <div class="level-right">
        <slot name="bottom-right" />
      </div>
    </div>

  </div>
</div>
