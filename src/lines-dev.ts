import fs from 'node:fs';
import { promisify } from 'node:util';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'stream';

const pipelineAsync = promisify(pipeline);

const date = new Date();
const movieName = `movie_ids_${date.getUTCMonth() + 1 < 10 ? '0' + date.getUTCMonth() + 1 : date.getUTCMonth() + 1}_0${date.getUTCDate()}_${date.getFullYear()}.json.gz`;
const actorName = `person_ids_${date.getUTCMonth() + 1 < 10 ? '0' + date.getUTCMonth() + 1 : date.getUTCMonth() + 1}_0${date.getUTCDate()}_${date.getFullYear()}.json.gz`;

export function getLinesFilms(): number[] {
  const data = fs.readFileSync('movieIDS.json', { encoding: 'utf-8' });
  return JSON.parse(data);
}

export function getLinesActors(): number[] {
  const data = fs.readFileSync('actorIDS.json', { encoding: 'utf-8' });
  return JSON.parse(data);
}

async function fetchAndSaveGz(url: string, outputPath: string) {
  try {
    const response = await fetch(url);
    if (!response.body || !response.ok) {
      return;
    }

    const fileStream = fs.createWriteStream(outputPath);
    await pipelineAsync(response.body, fileStream);
    console.log(`File saved to ${outputPath}`);
  } catch (error) {
    console.error('Error fetching and saving file:', error);
  }
}

async function extractGz(inputPath: string, outputPath: string) {
  try {
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);
    const gunzip = createGunzip();

    await pipelineAsync(readStream, gunzip, writeStream);
    console.log(`File extracted to ${outputPath}`);
    const extractedFile = fs.readFileSync(outputPath, { encoding: 'utf-8' });

    let modifiedFile = '[' + extractedFile.replace(/\r?\n/g, ',') + ']';
    modifiedFile = modifiedFile.slice(0, -2) + ']';

    const json = JSON.parse(modifiedFile)
      .filter((item: { popularity: number }) => item.popularity > 5)
      .map((item: { id: number }) => item.id);

    fs.writeFile(outputPath, JSON.stringify(json), { encoding: 'utf-8' }, (err) => {
      if (err) console.error('Error writing file:', err);
    });
  } catch (error) {
    console.error('Error extracting file:', error);
  }
}

export async function downloadDaily() {
  if (!fs.existsSync(movieName) || !fs.existsSync(actorName)) {
    await fetchAndSaveGz(`http://files.tmdb.org/p/exports/${movieName}`, movieName);
    await fetchAndSaveGz(`http://files.tmdb.org/p/exports/${actorName}`, actorName);

    await extractGz(movieName, 'movieIDS.json');
    await extractGz(actorName, 'actorIDS.json');
  }
}
