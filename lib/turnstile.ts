const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verify a Cloudflare Turnstile token server-side.
 * Returns true if the token is valid.
 */
export async function verifyTurnstile(
  token: string,
  ip?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[v0] TURNSTILE_SECRET_KEY is not set — skipping verification");
    return true; // fail-open in dev so the app still works without keys
  }

  const body: Record<string, string> = {
    secret,
    response: token,
  };
  if (ip) body.remoteip = ip;

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString(),
  });

  const data = await res.json();
  return data.success === true;
}
