export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response('url is required', { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        ...request.headers,
        'host': new URL(url).host,
      },
    });

    const headers = new Headers(response.headers);
    headers.set('access-control-allow-origin', '*');
    headers.set('cache-control', 'public, max-age=86400, immutable');
    headers.delete('content-security-policy');
    headers.delete('cross-origin-resource-policy');

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    return new Response('Proxy error', { status: 500 });
  }
}