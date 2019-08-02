export default function(href: string): void {
  history.pushState(null, "", href);
  window.dispatchEvent(new CustomEvent("url-change", {detail: {href}}));
}
