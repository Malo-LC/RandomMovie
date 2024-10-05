import { Hono } from 'hono';
import { getLinesActors } from '../lines';
import { API_KEY, MOVIE_DB_API_URL } from '../utils/config';

const personsController = new Hono();

personsController.get('/:personId/movie-credits', async (c) => {
  const { personId } = c.req.param();
  const movieDbRes = await fetch(`${MOVIE_DB_API_URL}/person/${personId}/movie_credits?api_key=${API_KEY}&language=fr`);
  const data = await movieDbRes.json();
  return c.json(data);
});

personsController.get('/random-id', async (c) => {
  const actorIds: number[] = getLinesActors();
  const randomId = actorIds[Math.floor(Math.random() * actorIds.length)];
  return c.json({ randomId });
});

personsController.get('/:personId', async (c) => {
  const { personId } = c.req.param();
  const movieDbRes = await fetch(`${MOVIE_DB_API_URL}/person/${personId}?api_key=${API_KEY}&language=fr`);
  const data = await movieDbRes.json();
  return c.json(data);
});

export default personsController;
