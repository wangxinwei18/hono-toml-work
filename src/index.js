import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  const account_id = c.env.ACCOUNT_ID || "default_account_id";
  return c.text(`Account ID: ${account_id}`);
});

export default app;
