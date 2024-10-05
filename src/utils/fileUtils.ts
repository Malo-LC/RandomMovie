import fs, { promises as fsAsync } from 'node:fs';
import { promisify } from 'node:util';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'stream';

const pipelineAsync = promisify(pipeline);

export async function fetchAndSaveGz(url: string, outputPath: string) {
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

export async function extractGz(inputPath: string, outputPath: string) {
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

    await fsAsync.writeFile(outputPath, JSON.stringify(json), { encoding: 'utf-8' });
    console.log(`File modified and saved to ${outputPath}`);
  } catch (error) {
    console.error('Error extracting file:', error);
  }
}
