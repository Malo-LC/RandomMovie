import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import moviesController from './controllers/movies';
import personsController from './controllers/persons';
import { downloadDaily } from './lines';
import { API_KEY, NODE_ENV, PORT } from './utils/config';

if (!API_KEY) {
  throw new Error('Please provide a Movie DB API key');
} else if (NODE_ENV === 'development') {
  downloadDaily();
}

const app: Hono = new Hono();

app.use(
  '*',
  cors({
    origin: ['https://randomovie.onrender.com', 'http://localhost:5173'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    credentials: true,
  }),
);

app.route('/movies', moviesController);
app.route('/persons', personsController);

console.log(`Server is running on port ${PORT}`);
serve({
  fetch: app.fetch,
  port: PORT,
});
