import { Hono } from 'hono';
import { getLinesFilms } from '../lines';
import { API_KEY, MOVIE_DB_API_URL } from '../utils/config';

const moviesController = new Hono();

moviesController.get('/:movieId/credits', async (c) => {
  const { movieId } = c.req.param();
  const movieDbRes = await fetch(`${MOVIE_DB_API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=fr`);
  const data = await movieDbRes.json();
  return c.json(data);
});

moviesController.get('/:movieId/similar', async (c) => {
  const { movieId } = c.req.param();
  const movieDbRes = await fetch(`${MOVIE_DB_API_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=fr`);
  const data = await movieDbRes.json();
  return c.json(data.results);
});

moviesController.get('/random-id', async (c) => {
  const movieIds: number[] = getLinesFilms();
  const randomId = movieIds[Math.floor(Math.random() * movieIds.length)];
  return c.json({ randomId });
});

moviesController.get('/now-playing', async (c) => {
  const movieDbRes = await fetch(`${MOVIE_DB_API_URL}/movie/now_playing?api_key=${API_KEY}&language=fr`);
  const data = await movieDbRes.json();
  return c.json(data.results);
});

moviesController.get('/:movieId', async (c) => {
  const { movieId } = c.req.param();
  const movieDbRes = await fetch(`${MOVIE_DB_API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`);
  const data = await movieDbRes.json();
  return c.json(data);
});

export default moviesController;
