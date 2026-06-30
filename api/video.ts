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

    return new Response(response.body, {
      status: response.status,
      headers: {
        ...response.headers,
        'access-control-allow-origin': '*',
      },
    });
  } catch (error) {
    return new Response('Proxy error', { status: 500 });
  }
}