import dayjs, { Dayjs } from 'dayjs';
import fs from 'node:fs';
import { extractGz, fetchAndSaveGz } from './utils/fileUtils';

const moviesArchiveName = (date: Dayjs) => `movie_ids_${date.format('MM_DD_YYYY')}.json.gz`;
const actorsArchiveName = (date: Dayjs) => `person_ids_${date.format('MM_DD_YYYY')}.json.gz`;

export function getLinesFilms(): number[] {
  const data = fs.readFileSync('movieIDS.json', { encoding: 'utf-8' });
  return JSON.parse(data);
}

export function getLinesActors(): number[] {
  const data = fs.readFileSync('actorIDS.json', { encoding: 'utf-8' });
  return JSON.parse(data);
}

export async function downloadDaily() {
  const date = dayjs();
  const moviesName = moviesArchiveName(date);
  const actorName = actorsArchiveName(date);
  if (!fs.existsSync(moviesName) || !fs.existsSync(actorName)) {
    await fetchAndSaveGz(`http://files.tmdb.org/p/exports/${moviesName}`, moviesName);
    await fetchAndSaveGz(`http://files.tmdb.org/p/exports/${actorName}`, actorName);

    await extractGz(moviesName, 'movieIDS.json');
    await extractGz(actorName, 'actorIDS.json');
  }
}
