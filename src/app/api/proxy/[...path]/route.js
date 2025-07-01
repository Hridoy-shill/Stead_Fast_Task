export async function GET(req, { params }) {
  const { path } = params;

  const query = req.url.split('?')[1] || '';
  const queryString = query ? `?${query}` : '';

  const apiUrl = `http://157.230.240.97:9999/api/v1/${path.join('/')}${queryString}`;
  // console.log("➡️ Proxying to:", apiUrl);

  try {
    const response = await fetch(apiUrl, {
      method: "GET"
    });

    const contentType = response.headers.get("content-type") || "application/json";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return new Response(
      contentType.includes("application/json") ? JSON.stringify(data) : data,
      {
        status: response.status,
        headers: {
          "Content-Type": contentType
        }
      }
    );
  } catch (error) {
    console.error("❌ Proxy error:", error.message);
    return new Response(
      JSON.stringify({ error: "Proxy failed", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}