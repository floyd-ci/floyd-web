<script>
  import UserIcon from "../icons/user.svelte";
  import SignOutIcon from "../icons/sign-out.svelte";

  import {claims, logout, login_url} from "../auth";

  let menu_active = false;
</script>

<nav class="navbar is-light">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/" title="Home">
        <strong>Floyd CI</strong>
      </a>
      <div
        role="button"
        class="navbar-burger {menu_active ? 'is-active' : null}"
        on:click={() => {
          menu_active = !menu_active;
        }}
        aria-label="menu"
        aria-expanded="false">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </div>
    </div>
    <div class="navbar-menu {menu_active ? 'is-active' : null}">
      <div class="navbar-end">
        {#if $claims != null}
          <div class="navbar-item has-dropdown is-hoverable">
            <a href="/" class="navbar-link">
              <div class="image is-24x24">
                <img
                  alt="@{$claims.login}"
                  class="is-rounded"
                  src="https://github.com/{$claims.login}?size=24" />
              </div>
            </a>
            <div class="navbar-dropdown is-right">
              <a class="navbar-item" href="/profile">
                <UserIcon />
                <span>Profile</span>
              </a>
              <hr class="navbar-divider" />
              <a class="navbar-item" href="/" on:click={logout}>
                <SignOutIcon />
                <span>Log out</span>
              </a>
            </div>
          </div>
        {:else}
          <div class="navbar-item">
            <a class="button is-dark is-outlined" href={login_url}>
              Log in with GitHub
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</nav>
