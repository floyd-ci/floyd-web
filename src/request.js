// @flow

import {add_auth_header} from "./auth";

type Page = {
  pagedata: Object,
  pagination: ?{current: number, total: number},
};

const API_URL = "<@FLOYD_API_URL@>";

export async function get_object(url: string): Promise<Object> {
  var headers = new Headers({
    Accept: "application/vnd.pgrst.object+json",
  });

  await add_auth_header(headers);
  const response = await fetch(`${API_URL}/${url}`, {headers});
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function get_page(
  url: string,
  page: number,
  per_page: number,
): Promise<Page> {
  const from = (page - 1) * per_page;
  const to = from + per_page - 1;

  var headers = new Headers({
    Prefer: "count=exact",
    Range: `${from}-${to}`,
    "Range-unit": "items",
  });

  await add_auth_header(headers);
  const response = await fetch(`${API_URL}/${url}`, {headers});
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const content_range = response.headers.get("Content-Range");
  if (!content_range) {
    throw new Error("Header Content-Range is missing");
  }
  const [, total] = content_range.split("/");
  const num_pages = Math.trunc((+total - 1) / per_page) + 1;
  if (page > num_pages) {
    throw new Error("page number is too big");
  }

  const pagedata = await response.json();
  const pagination = num_pages > 1 ? {current: page, total: num_pages} : null;
  return {pagedata, pagination};
}
