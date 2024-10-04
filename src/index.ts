import 'dotenv/config';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
const API_KEY = process.env.MOVIE_DB_API_KEY

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/movie-db/route', async (c) => {
  const { type, detail } = c.req.query();
  const movieDbRes = await fetch(`https://api.themoviedb.org/3/${type}/${detail}?api_key=${API_KEY}&language=fr`);
  const data = await movieDbRes.json();
  return c.json(data.results);
});

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
