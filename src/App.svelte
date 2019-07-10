<script>
	import PageHeader from './components/PageHeader.svelte';
	import PageFooter from './components/PageFooter.svelte';

	export let page;
</script>

<PageHeader/>

<section class="section">
	<div class="container">
		<svelte:component this={page}/>
	</div>
</section>

<PageFooter/>
