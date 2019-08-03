<script context="module">
  import {preload, link_href, unlink} from "./profile";
  export {preload};
</script>

<script>
  export let linked_accounts = [];
  export let sessions = [];
</script>

<h1 class="title">Profile</h1>

<!-- linked_accounts -->
<div class="notification">
  <h2 class="subtitle">Linked Services</h2>
  <table class="table">
    <thead>
      <tr>
        <th>Service</th>
        <th>User</th>
        <th>Linking</th>
      </tr>
    </thead>
    <tbody>
      {#each linked_accounts as link}
        <tr>
          <td>
            <i class="fab fa-{link.service_id}" />
            <span>{link.service_name}</span>
          </td>
          <td>{link.name || 'n/a'}</td>
          <td>
            {#if link.name}
              <button
                class="button is-danger"
                on:click={() => unlink(link.service_id)}>
                Unlink
              </button>
            {:else}
              <a class="button is-success" href={link_href(link)}>Link</a>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<!-- sessions -->
<div class="notification">
  <h2 class="subtitle">Sessions</h2>
  <table class="table">
    <thead>
      <tr>
        <th>Last Login</th>
        <th>User Agent</th>
      </tr>
    </thead>
    <tbody>
      {#each sessions as {created, user_agent}}
        <tr>
          <td>{created}</td>
          <td>{user_agent}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
