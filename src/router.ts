import "svelte";

import * as Index from "./routes/index.svelte";
import * as Login from "./routes/login.svelte";
import * as NotFound from "./routes/404.svelte";
import * as Profile from "./routes/profile.svelte";
import * as NamespaceIndex from "./routes/[namespace]/index.svelte";
import ProjectHeader from "./routes/[namespace]/[project]/_header.svelte";
import * as ProjectIndex from "./routes/[namespace]/[project]/index.svelte";
import * as ProjectGraphs from "./routes/[namespace]/[project]/graphs.svelte";
import * as ProjectSites from "./routes/[namespace]/[project]/sites.svelte";
import * as ProjectStats from "./routes/[namespace]/[project]/stats.svelte";
import * as ProjectTestIndex from "./routes/[namespace]/[project]/tests/index.svelte";
import * as ProjectTest from "./routes/[namespace]/[project]/tests/[test].svelte";
import * as Tree from "./routes/[namespace]/[project]/tree/[...path].svelte";
import * as SitesIndex from "./routes/sites/index.svelte";
import * as Site from "./routes/sites/[site].svelte";
import JobHeader from "./routes/[namespace]/[project]/jobs/[job]/_header.svelte";
import * as Job from "./routes/[namespace]/[project]/jobs/[job]/index.svelte";
import * as Update from "./routes/[namespace]/[project]/jobs/[job]/update.svelte";
import * as Configure from "./routes/[namespace]/[project]/jobs/[job]/configure.svelte";
import * as Build from "./routes/[namespace]/[project]/jobs/[job]/build.svelte";
import * as Issues from "./routes/[namespace]/[project]/jobs/[job]/issues.svelte";
import * as Coverage from "./routes/[namespace]/[project]/jobs/[job]/coverage.svelte";
import * as TestIndex from "./routes/[namespace]/[project]/jobs/[job]/tests/index.svelte";
import * as Test from "./routes/[namespace]/[project]/jobs/[job]/tests/[test].svelte";

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

const routing_tree: RoutingTree = {
  "@": Index,
  ":": {
    "~": "namespace",
    "@": NamespaceIndex,
    ":": {
      "~": "project",
      "/": ProjectHeader,
      "@": ProjectIndex,
      graphs: {"@": ProjectGraphs},
      jobs: {
        ":": {
          "~": "job",
          "/": JobHeader,
          "@": Job,
          update: {"@": Update},
          configure: {"@": Configure},
          build: {"@": Build},
          issues: {"@": Issues},
          coverage: {"@": Coverage},
          tests: {
            "@": TestIndex,
            ":": {
              "~": "test",
              "@": Test,
            },
          },
        },
      },
      sites: {"@": ProjectSites},
      stats: {"@": ProjectStats},
      tests: {
        "@": ProjectTestIndex,
        ":": {
          "~": "test",
          "@": ProjectTest,
        },
      },
      tree: {
        "*": {
          "~": "path",
          "@": Tree,
        },
      },
    },
  },
  sites: {
    "@": SitesIndex,
    ":": {
      "~": "site",
      "@": Site,
    },
  },
  login: {"@": Login},
  profile: {"@": Profile},
};

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
