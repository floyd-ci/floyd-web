import {add_auth_header} from "./auth";

interface Page<T> {
  pagedata: T[];
  pagination?: {
    current: number;
    total: number;
  };
}

const API_URL = process.env.FLOYD_API_URL;

export async function fetch_json<T>(url: string): Promise<T> {
  const response = await fetch(`${API_URL}/${url}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function get_object<T>(url: string): Promise<T> {
  const headers = new Headers({
    Accept: "application/vnd.pgrst.object+json",
  });

  await add_auth_header(headers);
  const response = await fetch(`${API_URL}/${url}`, {headers});
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function get_page<T>(
  url: string,
  page: number,
  per_page: number,
): Promise<Page<T>> {
  const from = (page - 1) * per_page;
  const to = from + per_page - 1;

  const headers = new Headers({
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
