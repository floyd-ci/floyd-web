import {get_page} from "../request";

export async function preload(_, query: URLSearchParams) {
  const sessions = (await get_page(`sessions`, 1, 10)).pagedata;
  return {sessions};
}
