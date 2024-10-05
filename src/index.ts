import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import moviesController from './controllers/movies';
import personsController from './controllers/persons';
import { downloadDaily } from './lines';
import { API_KEY, PORT } from './utils/config';

const app: Hono = new Hono();

if (!API_KEY) {
  throw new Error('Please provide a Movie DB API key');
} else {
  downloadDaily();
}

app.route('/movies', moviesController);
app.route('/persons', personsController);

console.log(`Server is running on port ${PORT}`);
serve({
  fetch: app.fetch,
  port: PORT,
});
