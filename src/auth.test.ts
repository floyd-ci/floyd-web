import * as auth from "./auth";

test("request_signup", async (): Promise<void> => {
  const email = "test@example.com";
  await auth.request_signup(email);
  expect(fetchMock).toHaveBeenCalledWith(
    process.env.FLOYD_AUTH_URL + "/signup",
    {body: JSON.stringify({email}), credentials: "include", method: "POST"},
  );
});
