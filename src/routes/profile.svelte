<script context="module">
  import {preload} from "./profile";
  export {preload};
</script>

<script>
  export let sessions = [];
</script>

<h1 class="title">Profile</h1>

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
