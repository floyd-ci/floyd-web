import {login} from "../auth";
import {goto} from "../goto";

export async function preload(_, query: URLSearchParams) {
  if (query.has("code")) {
    const code = query.get("code");
    await login(code, "github");
    goto("/profile");
  }
}
