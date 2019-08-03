import "svelte";

import * as Index from "./routes/index.svelte";
import * as Login from "./routes/login.svelte";
import * as NotFound from "./routes/404.svelte";
import * as Profile from "./routes/profile.svelte";
import * as SignUp from "./routes/signup.svelte";

interface Module {
  default: any;
}

interface Route {
  module: Module;
}

interface Page {
  page: any;
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
  return {module};
}

export default function(location: Location): Page {
  const route = select_route(location.pathname);
  const page = route.module.default;
  return {page};
}
