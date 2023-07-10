export interface ExtendedFetchConfig extends RequestInit {
  timeout?: number;
  maxRetryCount?: number;
  delay?: number;
}

/**
 * fetch with timeout
 * - Defaault timeout: 5sec
 * @param input - Request URL
 * @param init - Config for fetch
 * @returns Promise<Response>
 */
const fetchWithTimeout = async (
  input: RequestInfo | URL,
  init?: RequestInit & { timeout?: number },
): Promise<Response> => {
  const { timeout = 5000 } = init || {};
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError')
      throw new Error('Fetch timeout');
    throw e;
  }
};

/**
 * fetch with timeout and retry
 * - Default timeot: 5sec
 * - Default retry count: 3
 * @param input - Request URL
 * @param init - Config for fetch
 * @returns Promise<Response>
 */
export const extendedFetch = (
  input: RequestInfo | URL,
  init?: ExtendedFetchConfig,
): Promise<Response> => {
  const { timeout = 17000, maxRetryCount = 0 } = init || {};

  return new Promise((resolve, reject) => {
    let retryCount = 0;
    const executeFetch = () => {
      const fetchInstance = fetchWithTimeout(input, { ...init, timeout });

      fetchInstance
        .then((data) => {
          resolve(data);
        })
        .catch((reason) => {
          console.error(
            reason,
            retryCount >= maxRetryCount ? 'Abort' : 'Continue',
            retryCount,
          );
          retryCount++;
          if (retryCount <= maxRetryCount) executeFetch();
          else reject('All retries failed.');
        });
    };

    executeFetch();
  });
};
