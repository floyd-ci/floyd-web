import "svelte";

import * as Index from "./routes/index.svelte";
import * as Login from "./routes/login.svelte";
import * as NotFound from "./routes/404.svelte";
import * as Profile from "./routes/profile.svelte";
import * as SignUp from "./routes/signup.svelte";

interface Module {
  default: any;
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

export default function(location: Location): Page {
  const {default: page} = select_module(location.pathname);
  return {page};
}
