<script>
	let menu_active = false;
</script>

<nav class="navbar is-light">
	<div class="container">
		<div class="navbar-brand">
			<a class="navbar-item" href="/" title="Home"><strong>Floyd CI</strong></a>
			<a role="button" class="navbar-burger {menu_active ? 'is-active' : null}" on:click={() => {menu_active = !menu_active;}} aria-label="menu" aria-expanded="false">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>
		<div class="navbar-menu {menu_active ? 'is-active' : null}">
			<div class="navbar-end">
				<a class="navbar-item" href="/login">Log in</a>
				<div class="navbar-item">
					<a class="button is-dark is-outlined" href="/signup">Get started</a>
				</div>
			</div>
		</div>
	</div>
</nav>
