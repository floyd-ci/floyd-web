import "svelte";

import {get_page, get_object} from "./request";

type Params = Record<string, string>;
type Props = Record<string, unknown>;

interface Module {
  default: unknown;
  preload?: (params: Params, query: URLSearchParams) => Promise<Props>;
  dataurl?: (params: Params, query: URLSearchParams) => string;
  pagination?: true;
}

interface Component {
  component: unknown;
  props: Props;
}

export interface Route {
  module: Module;
  params: Params;
  headers: Array<Component>;
}

export interface Page {
  headers: Array<Component>;
  page: Component;
}

interface RoutingTree {
  readonly [sub: string]: unknown | Module | string | RoutingTree;
}

export function select_route(
  rules: RoutingTree,
  path: string,
): Route | undefined {
  const params: Params = {};
  const headers: Array<Component> = [];
  let sub: RoutingTree | Module | string | unknown;

  const pieces: string[] = path.split("/").filter(Boolean);
  for (let i = 0; i < pieces.length; ++i) {
    let piece: string = pieces[i];

    if ((sub = rules[piece] || rules[":"])) {
      // noop
    } else if ((sub = rules["*"])) {
      piece = pieces.slice(i).join("/");
      i = pieces.length;
    } else {
      return;
    }

    rules = sub as RoutingTree;

    if ((sub = rules["~"])) {
      params[sub as string] = piece;
    }

    if ((sub = rules["/"])) {
      const props = Object.assign({segment: pieces[i + 1]}, params);
      headers.push({component: sub, props});
    }
  }

  if ((sub = rules["@"])) {
    return {module: sub as Module, params, headers};
  }
}

export async function load_route(
  route: Route,
  query: URLSearchParams,
): Promise<Page> {
  const {module, params, headers} = route;
  const {default: component, preload, dataurl, pagination} = module;
  const props: Props = params;

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

  return {headers, page: {component, props}};
}
