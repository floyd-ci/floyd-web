import 'bulma/bulma.sass'; // eslint-disable-line import/no-unassigned-import
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: location.href,
	},
});

export default app;
