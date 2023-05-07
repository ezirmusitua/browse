const resource_base = process.env.NEXT_PUBLIC_RESOURCE_BASE;

class FetchError extends Error {
  public readonly name = "FetchError";
  constructor(public readonly message: string, public readonly data: any) {
    super(message);
  }
}

function buildUrl(
  path: string,
  params?: Record<string, any>,
  query?: Record<string, any>
) {
  if (!path.startsWith("/")) throw new Error("Path must stats with `/`");
  const query_string = new URLSearchParams(query || {}).toString();
  path = Object.keys(params || {}).reduce(
    (acc, key) => acc.replace(`:${key}`, params[key]),
    path
  );
  return `${resource_base}${path}?${query_string}`;
}

async function handleError(url: string, options: RequestInit) {
  try {
    const resp = await fetch(url, options);
    const data = resp.body;
    if (resp.status >= 400) {
      throw new FetchError("Unexpected Response", data);
    }
    return resp;
  } catch (e) {
    throw new FetchError(e.message, null);
  }
}

export async function getJson(
  path: string,
  params?: Record<string, any>,
  query?: Record<string, any>
) {
  const resp = await handleError(buildUrl(path, params, query), {
    method: "GET",
  });
  return resp.json();
}
