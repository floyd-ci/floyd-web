// @flow

import {writable} from "svelte/store";

type Claims = {
  exp: number,
  role: string,
};

type LoginCred = {email: string, password: string};
type LoginAuth = {service: string, token: string};

const AUTH_URL: string = "<@FLOYD_AUTH_URL@>";

var token: string = localStorage.getItem("token") || "";
var claims: ?Claims = decodeToken(token);
const store = writable(claims);

// --

export {store as claims};

export async function add_auth_header(headers: Headers): Promise<void> {
  if (claims != null && claims.exp <= Math.floor(Date.now() / 1000)) {
    await renewToken();
  }
  if (token !== "") {
    headers.set("Authorization", "Bearer " + token);
  }
}

export async function login(data: LoginCred | LoginAuth): Promise<void> {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw await response.json();
  }
  await renewToken();
}

export function logout(): void {
  fetch(`${AUTH_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  clearToken();
}

// given email, request a token
export function request_signup(email: string): Promise<void> {
  return post_json(`${AUTH_URL}/signup`, {email});
}

// given token and password, create account, (get auth token?)
export function signup(token: string, password: string): Promise<void> {
  return post_json(`${AUTH_URL}/register`, {token, password});
}

export function forgot(email: string): Promise<void> {
  return post_json(`${AUTH_URL}/forgot`, {email});
}

export function pwreset(token: string, password: string): Promise<void> {
  return post_json(`${AUTH_URL}/reset`, {token, password});
}

export function link_service(service: string, code: string): Promise<void> {
  return post_json(`${AUTH_URL}/link`, {code, service});
}

export function unlink_service(service: string): Promise<void> {
  return post_json(`${AUTH_URL}/unlink`, {service});
}

// --

function decodeToken(str: string): ?Claims {
  const a = str.split(".");
  if (a.length !== 3) {
    return null;
  }
  return JSON.parse(atob(a[1]));
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

function clearToken(): void {
  token = "";
  claims = null;
  store.set(claims);
  localStorage.removeItem("token");
}

async function post_json(url: string, data: Object): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw await response.json();
  }
}
