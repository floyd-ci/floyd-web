import {get_token} from "./auth";

interface Page<T> {
  pagedata: T[];
  pagination?: {
    current: number;
    total: number;
  };
}

const API_URL = process.env.FLOYD_API_URL;

async function add_auth_header(
  record: Record<string, string>,
): Promise<Headers> {
  const headers = new Headers(record);
  const token = await get_token();
  if (token !== "") {
    headers.set("Authorization", "Bearer " + token);
  }
  return headers;
}

export async function request<T>(
  resource: string,
  init: Record<string, any> = {}, // eslint-disable-line @typescript-eslint/no-explicit-any
  extract = (response: Response): Promise<T> => response.json(),
): Promise<T> {
  const response = await fetch(resource, init);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return extract(response);
}

export function fetch_json<T>(url: string): Promise<T> {
  return request<T>(`${API_URL}/${url}`);
}

export async function get_object<T>(url: string): Promise<T> {
  const headers = await add_auth_header({
    Accept: "application/vnd.pgrst.object+json",
  });
  return request<T>(`${API_URL}/${url}`, {headers});
}

export async function get_page<T>(
  url: string,
  page: number,
  per_page: number,
): Promise<Page<T>> {
  const from = (page - 1) * per_page;
  const to = from + per_page - 1;

  const headers = await add_auth_header({
    Prefer: "count=exact",
    Range: `${from}-${to}`,
    "Range-unit": "items",
  });

  const extract = async (response: Response): Promise<Page<T>> => {
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
    const pagination =
      num_pages > 1 ? {current: page, total: num_pages} : undefined;
    return {pagedata, pagination};
  };

  return request<Page<T>>(`${API_URL}/${url}`, {headers}, extract);
}
