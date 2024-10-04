import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { downloadDaily, getLinesActors, getLinesFilms } from './lines-dev';

downloadDaily();

const app: Hono = new Hono();
const API_KEY = process.env.MOVIE_DB_API_KEY;

if (!API_KEY) {
  throw new Error('Please provide a Movie DB API key');
}

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/movies/random-id', async (c) => {
  const movieIds: number[] = getLinesFilms();
  const randomId = movieIds[Math.floor(Math.random() * movieIds.length)];
  return c.json({ randomId });
});

app.get('/actors/random-id', async (c) => {
  const actorIds: number[] = getLinesActors();
  const randomId = actorIds[Math.floor(Math.random() * actorIds.length)];
  return c.json({ randomId });
});

app.get('/movie-db/route', async (c) => {
  const { type, detail } = c.req.query();
  const movieDbRes = await fetch(`https://api.themoviedb.org/3/${type}/${detail}?api_key=${API_KEY}&language=fr`);
  const data = await movieDbRes.json();
  return c.json(data.results);
});

app.get('/movie-db/:movieId', async (c) => {
  const { movieId } = c.req.param();
  const movieDbRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr`);
  const data = await movieDbRes.json();
  return c.json(data);
});

app.get('/movie-db/:movieId/credits', async (c) => {
  const { movieId } = c.req.param();
  const movieDbRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=fr`,
  );
  const data = await movieDbRes.json();
  return c.json(data);
});

app.get('/movie-db/:movieId/similar', async (c) => {
  const { movieId } = c.req.param();
  const movieDbRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=fr`,
  );
  const data = await movieDbRes.json();
  return c.json(data.results);
});

app.get('/movie-db/person/:personId', async (c) => {
  const { personId } = c.req.param();
  const movieDbRes = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}&language=fr`);
  const data = await movieDbRes.json();
  return c.json(data);
});

app.get('/movie-db/person/:personId/movie-credits', async (c) => {
  const { personId } = c.req.param();
  const movieDbRes = await fetch(
    `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${API_KEY}&language=fr`,
  );
  const data = await movieDbRes.json();
  return c.json(data);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
