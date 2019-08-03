import "svelte";

import * as Index from "./routes/index.svelte";
import * as Login from "./routes/login.svelte";
import * as NotFound from "./routes/404.svelte";
import * as Profile from "./routes/profile.svelte";
import * as SignUp from "./routes/signup.svelte";

import {get_page, get_object} from "./request";

type Params = Record<string, string>;
type Props = Record<string, any>;

interface Module {
  default: any;
  preload?: (Params, URLSearchParams) => Promise<Props>;
  dataurl?: (Params, URLSearchParams) => string;
  pagination?: true;
}

interface Route {
  module: Module;
  params: Params;
}

interface Page {
  page: any;
  props: Props;
}

function select_module(path: string): Module {
  if (path === "/") {
    return Index;
  } else if (path === "/login") {
    return Login;
  } else if (path === "/profile") {
    return Profile;
  } else if (path === "/signup") {
    return SignUp;
  } else {
    return NotFound;
  }
}

export function select_route(path: string): Route {
  const module: Module = select_module(path);
  const params: Record<string, string> = {};
  return {module, params};
}

export async function load_route(
  route: Route,
  query: URLSearchParams,
): Promise<Page> {
  const {module, params} = route;
  const {default: page, preload, dataurl, pagination} = module;
  const props: Props = {};

  if (preload) {
    const preloaded: Props = await preload(params, query);
    Object.assign(props, preloaded);
  }

  if (dataurl) {
    const url: string = dataurl(params, query);
    if (pagination) {
      const page: number = +(query.get("page") || 1);
      const per_page: number = +(query.get("per_page") || 10);
      Object.assign(props, await get_page(url, page, per_page));
    } else {
      Object.assign(props, await get_object(url));
    }
  }

  return {page, props};
}

export default function(location: Location): Promise<Page> {
  const route = select_route(location.pathname);
  return load_route(route, new URLSearchParams(location.search));
}
