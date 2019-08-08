import {link_service, unlink_service} from "../auth";
import {get_page} from "../request";
import {goto} from "../goto";

export async function preload(_, query: URLSearchParams) {
  if (query.has("link") && query.has("code")) {
    try {
      const service = query.get("link");
      const code = query.get("code");
      await link_service(service, code);
    } catch (err) {
      console.log(err);
      window.alert(err);
    }
    history.replaceState(null, "", "/profile");
  }

  const linked_accounts = (await get_page(`linked_accounts`, 1, 10)).pagedata;
  const sessions = (await get_page(`sessions`, 1, 10)).pagedata;
  return {linked_accounts, sessions};
}

export function link_href({service_id, client_id, auth_url, scope}): string {
  const redirect_uri = encodeURIComponent(
    `https://${location.host}/profile?link=${service_id}`,
  );
  return (
    `${auth_url}` +
    `?client_id=${client_id}` +
    `&redirect_uri=${redirect_uri}` +
    `&scope=${scope}` +
    `&response_type=code` +
    `&state=87d11950465e5937515c`
  );
}

export async function unlink(service): Promise<void> {
  try {
    await unlink_service(service);
    // TODO: remove nickname from service and redraw, without reroute.
    goto("/");
  } catch (err) {
    console.log(err);
    window.alert(err);
  }
}
