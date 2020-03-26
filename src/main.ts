import "bulma/bulma.sass";
import "svelte";

import App from "./app.svelte";
import * as NotFound from "./404.svelte";
import routing_tree from "@routes@";
import {handle_click} from "./click";
import {Page, Route, select_route, load_route} from "./router";

// In case we have to deliver the 404.html
const redirect_href = sessionStorage.getItem("redirect_href");
sessionStorage.removeItem("redirect_href");
if (redirect_href && redirect_href !== location.href) {
  history.replaceState(null, "", redirect_href);
}

const app = new App({
  target: document.body,
});

function select_page(location: Location): Promise<Page> {
  const notfound: Route = {module: NotFound, params: {}, headers: []};
  const route = select_route(routing_tree, location.pathname);
  return load_route(route || notfound, new URLSearchParams(location.search));
}

async function navigate(): Promise<void> {
  const page = await select_page(location);
  app.$set(page);
}

window.addEventListener("click", handle_click);
window.addEventListener("popstate", navigate);
window.addEventListener("url-change", navigate);

navigate();
