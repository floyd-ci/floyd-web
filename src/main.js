import 'bulma/bulma.sass'; // eslint-disable-line import/no-unassigned-import
import App from './App.svelte';

// In case we have to deliver the 404.html
const redirect_href = sessionStorage.getItem('redirect_href');
sessionStorage.removeItem('redirect_href');
if (redirect_href && redirect_href !== location.href) {
	history.replaceState(null, '', redirect_href);
}

const app = new App({
	target: document.body,
	props: {
		name: location.href,
	},
});

export default app;
