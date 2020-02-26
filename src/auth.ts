import {writable} from "svelte/store";

interface Claims {
  exp: number;
  role: string;
}

const AUTH_URL = process.env.FLOYD_AUTH_URL;

function decodeToken(str: string): Claims | null {
  const a = str.split(".");
  if (a.length !== 3) {
    return null;
  }
  return JSON.parse(atob(a[1]));
}

let token: string = localStorage.getItem("token") || "";
let claims: Claims | null = decodeToken(token);
const store = writable(claims);

function clearToken(): void {
  token = "";
  claims = null;
  store.set(claims);
  localStorage.removeItem("token");
}

async function renewToken(): Promise<void> {
  const response = await fetch(`${AUTH_URL}/api_token`, {
    credentials: "include",
  });
  if (!response.ok) {
    clearToken();
    return;
  }
  token = (await response.json()).token;
  claims = decodeToken(token);
  store.set(claims);
  localStorage.setItem("token", token);
}

export {store as claims};

export async function add_auth_header(headers: Headers): Promise<void> {
  if (claims != null && claims.exp <= Math.floor(Date.now() / 1000)) {
    await renewToken();
  }
  if (token !== "") {
    headers.set("Authorization", "Bearer " + token);
  }
}

export function logout(): void {
  fetch(`${AUTH_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  clearToken();
}

export const login_url = `${AUTH_URL}/login/`;
