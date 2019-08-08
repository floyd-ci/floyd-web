import {login} from "../auth";
import {goto} from "../goto";

export async function preload(_, query: URLSearchParams) {
  if (query.has("service") && query.has("code")) {
    const service = query.get("service");
    const code = query.get("code");
    await login({code, service});
    goto("/profile");
  }
}

export function service_href({service_id, client_id, auth_url, scope}): string {
  const redirect_uri = encodeURIComponent(
    `https://${location.host}/login?service=${service_id}`,
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
