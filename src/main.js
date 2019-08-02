import "bulma/bulma.sass"; // eslint-disable-line import/no-unassigned-import
import App from "./app.svelte";
import select_page from "./router";
import goto from "./goto";

// In case we have to deliver the 404.html
const redirect_href = sessionStorage.getItem("redirect_href");
sessionStorage.removeItem("redirect_href");
if (redirect_href && redirect_href !== location.href) {
  history.replaceState(null, "", redirect_href);
}

const app = new App({
  target: document.body,
});

function navigate() {
  const page = select_page(location.pathname);
  app.$set({page});
}

function find_anchor(target) {
  var node = target;
  if (!(node instanceof Node)) {
    return;
  }
  while (node && node.nodeName.toUpperCase() !== "A") {
    node = node.parentNode;
  }
  if (node && node instanceof HTMLAnchorElement) {
    return node;
  }
  return null;
}

function handle_click(event) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey) {
    return;
  }

  const a = find_anchor(event.target);
  if (!a || a.host !== location.host) {
    return;
  }

  event.preventDefault();
  goto(a.href);
}

window.addEventListener("click", handle_click);
window.addEventListener("popstate", navigate);
window.addEventListener("url-change", navigate);

navigate();
