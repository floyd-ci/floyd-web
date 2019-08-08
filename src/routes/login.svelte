<script context="module">
  import {preload, service_href} from "./login";
  export {preload};
</script>

<script>
  import AuthDialog from "../components/auth-dialog.svelte";
  import EmailInput from "../components/email-input.svelte";
  import PasswordInput from "../components/password-input.svelte";
  import {fetch_json} from "../request";
  import {login} from "../auth";
  import {goto} from "../goto";

  let promise = fetch_json(
    "/services?select=service_id,service_name,client_id,auth_url,scope&order=service_id",
  );

  let email = "";
  let password = "";
  let error = "";

  async function submit() {
    try {
      await login({email, password});
      goto("/");
    } catch (err) {
      error = err.message;
    }
  }
</script>

<style>
  .divider {
    display: block;
    position: relative;
    border-top: 0.1rem solid #dbdbdb;
    height: 0.1rem;
    margin: 2rem 0;
    text-align: center;
  }

  .divider[data-content]::after {
    background: #fff;
    color: #b5b5b5;
    content: attr(data-content);
    display: inline-block;
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
    transform: translateY(-1rem);
    text-align: center;
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>

<AuthDialog {email} on:submit={submit}>
  <span slot="title">Welcome back</span>
  <span slot="subtitle">Please login to proceed.</span>
  <span slot="submit">Login</span>

  <a slot="bottom-left" href="signup">Don't have an account?</a>
  <a slot="bottom-right" href="forgot">Forgot your password?</a>

  {#if error}
    <span>{error}</span>
  {/if}

  {#await promise}
    <!-- nothing -->
  {:then services}
    {#each services as service}
      <div class="field">
        <a href={service_href(service)} class="button is-fullwidth">
          <span>Log in with {service.service_name}</span>
        </a>
      </div>
    {/each}
    <div class="divider" data-content="OR" />
  {:catch err}
    <!-- nothing -->
  {/await}

  <EmailInput name="email" bind:value={email} placeholder="Email" />
  <PasswordInput name="password" bind:value={password} placeholder="Password" />
</AuthDialog>
