export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/users") {
      try {
        const { results } = await env.DB.prepare(
          "SELECT * FROM users LIMIT 20"
        ).all();
        
        return Response.json(results);
      } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
      }
    }

    return env.ASSETS.fetch(request);
  }
};