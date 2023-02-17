export const cookieOptions = {
  path: "/",
  name: "smapy-auth-token",
  maxAge: 1000 * 60 * 60 * 24 * 365,
  sameSite: "lax",
  secure: undefined,
  domain: undefined,
};
