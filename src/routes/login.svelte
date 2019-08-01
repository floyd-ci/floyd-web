<script>
  import AuthDialog from "../components/auth-dialog.svelte";
  import {login} from "../auth";

  async function fetch_json(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  let promise = fetch_json(
    "<@FLOYD_API_URL@>/services?select=service_id,service_name,client_id,auth_url,scope&order=service_id",
  );

  let email = "";
  let password = "";
  let error = "";

  async function submit() {
    try {
      await login({email, password});
    } catch (err) {
      error = err.message;
    }
  }

  function href({service_id, client_id, auth_url, scope}) {
    const redirect_uri = encodeURIComponent(
      `https://${location.host}/login/${service_id}`,
    );
    return `${auth_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&state=87d11950465e5937515c`;
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
        <a href={href(service)} class="button is-fullwidth">
          <span>Log in with {service.service_name}</span>
        </a>
      </div>
    {/each}
    <div class="divider" data-content="OR" />
  {:catch err}
    <!-- nothing -->
  {/await}

  <div class="field">
    <p class="control">
      <input
        bind:value={email}
        class="input"
        name="email"
        type="email"
        placeholder="Your Email" />
    </p>
  </div>

  <div class="field">
    <p class="control">
      <input
        bind:value={password}
        class="input"
        name="password"
        type="password"
        placeholder="Your Password" />
    </p>
  </div>
</AuthDialog>
