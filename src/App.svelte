<script>
	import PageHeader from './components/PageHeader.svelte';
	import PageFooter from './components/PageFooter.svelte';

	export let name;
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<PageHeader/>

<h1>Hello {name}!</h1>

<PageFooter/>
