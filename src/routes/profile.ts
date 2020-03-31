import {get_page} from "../request";

export async function preload() {
  const {pagedata: sessions} = await get_page("sessions", 1, 10);
  return {sessions};
}
