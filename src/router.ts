import "svelte";

import * as NotFound from "./404.svelte";
import routing_tree from "@routes@";
import {get_page, get_object} from "./request";

type Params = Record<string, string>;
type Props = Record<string, unknown>;

interface Module {
  default: unknown;
  preload?: (Params, URLSearchParams) => Promise<Props>;
  dataurl?: (Params, URLSearchParams) => string;
  pagination?: true;
}

interface Component {
  component: unknown;
  props: Props;
}

interface Route {
  module: Module;
  params: Params;
  headers: Array<Component>;
}

interface Page {
  headers: Array<Component>;
  page: Component;
}

interface RoutingTree {
  readonly [sub: string]: unknown | Module | string | RoutingTree;
}

export function select_route(rules: RoutingTree, path: string): Route {
  const params: Params = {};
  const headers: Array<Component> = [];

  const pieces: string[] = path.split("/").filter(Boolean);
  for (let i = 0; i < pieces.length; ++i) {
    let piece: string = pieces[i];

    let subRules;
    if ((subRules = rules[piece] || rules[":"])) {
      // noop
    } else if ((subRules = rules["*"])) {
      piece = pieces.slice(i).join("/");
      i = pieces.length;
    } else {
      return {module: NotFound, params: {}, headers: []};
    }

    rules = subRules;

    const param = rules["~"];
    if (param) {
      params[param as string] = piece;
    }

    const head = rules["/"];
    if (head) {
      const props = Object.assign({segment: pieces[i + 1]}, params);
      headers.push({component: head, props});
    }
  }

  const module = rules["@"];
  if (!module) {
    return {module: NotFound, params: {}, headers: []};
  }

  return {module: module as Module, params, headers};
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

export function select_page(location: Location): Promise<Page> {
  const route = select_route(routing_tree, location.pathname);
  return load_route(route, new URLSearchParams(location.search));
}
