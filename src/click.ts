import goto from "./goto";

function find_anchor(target: EventTarget): HTMLAnchorElement | null {
  let node = target instanceof Node ? (target as Node) : null;
  while (node && node.nodeName.toUpperCase() !== "A") {
    node = node.parentNode;
  }
  return node && node instanceof HTMLAnchorElement ? node : null;
}

export default function(event: MouseEvent): void {
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
