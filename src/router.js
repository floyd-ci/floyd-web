import Index from "./routes/index.svelte";
import SignUp from "./routes/signup.svelte";
import Login from "./routes/login.svelte";
import NotFound from "./routes/404.svelte";

export default function(path) {
  if (path === "/") {
    return Index;
  } else if (path === "/signup") {
    return SignUp;
  } else if (path === "/login") {
    return Login;
  } else {
    return NotFound;
  }
}
