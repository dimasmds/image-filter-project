import fs from 'fs';
import Jimp = require('jimp');
import path from 'path';

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  const photo = await Jimp.read(inputURL);
  const outPath = `/tmp/filtered.${Math.floor(Math.random() * 2000)}.jpg`;

  return new Promise((resolve) => {
    photo
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write(path.resolve(__dirname, outPath), () => {
        resolve(path.resolve(__dirname, outPath));
      });
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>) {
  files.forEach((file) => {
    fs.unlinkSync(file);
  });
}
