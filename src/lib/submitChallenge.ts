export class ChallengeSubmissionError extends Error {}

/** Submit directly from the browser; Web3Forms delivers to the key's verified inbox. */
export async function submitChallenge(
  fields: FormData,
  send: typeof fetch = fetch,
): Promise<void> {
  const response = await send('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(fields)),
    signal: AbortSignal.timeout(20_000),
  });

  if (response.status === 429) {
    throw new ChallengeSubmissionError(
      'Too many attempts right now. Please wait a little and try again, or email us directly.',
    );
  }

  const result: unknown = await response.json();
  if (
    !response.ok ||
    typeof result !== 'object' ||
    result === null ||
    !('success' in result) ||
    result.success !== true
  ) {
    throw new ChallengeSubmissionError(
      'We couldn’t confirm your message was sent. Please try again or email us directly.',
    );
  }
}
