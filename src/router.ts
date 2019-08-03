import "svelte";

import Index from "./routes/index.svelte";
import Login from "./routes/login.svelte";
import NotFound from "./routes/404.svelte";
import Profile from "./routes/profile.svelte";
import SignUp from "./routes/signup.svelte";

export default function(path): any {
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
