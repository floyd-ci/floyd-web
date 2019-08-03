import "bulma/bulma.sass";
import "svelte";

import App from "./app.svelte";
import handle_click from "./click";
import select_page from "./router";

// In case we have to deliver the 404.html
const redirect_href = sessionStorage.getItem("redirect_href");
sessionStorage.removeItem("redirect_href");
if (redirect_href && redirect_href !== location.href) {
  history.replaceState(null, "", redirect_href);
}

const app = new App({
  target: document.body,
});

function navigate(): void {
  const page = select_page(location.pathname);
  app.$set({page});
}

window.addEventListener("click", handle_click);
window.addEventListener("popstate", navigate);
window.addEventListener("url-change", navigate);

navigate();
