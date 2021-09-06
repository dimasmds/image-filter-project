import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { deleteLocalFiles, filterImageFromURL } from './util/util';

(async () => {
  // setup server and external middleware
  const app = express();
  const PORT = process.env.PORT || 8082;
  app.use(bodyParser.json());

  app.get('/filteredimage', async (request: Request, response: Response) => {
    const { image_url: imageUrl } = request.query;

    if (!imageUrl) {
      return response.status(400).send({ message: 'image_url required' });
    }

    if (typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
      return response.status(400).send({ message: 'image_url is malformed' });
    }

    try {
      console.log('called');
      const filteredPath = await filterImageFromURL(imageUrl);
      return response.status(200).sendFile(filteredPath, async () => {
        await deleteLocalFiles([filteredPath]);
      });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: 'ups! something wrong with our server' });
    }
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get('/', async (request: Request, response: Response) => {
    response.send('try GET /filteredimage?image_url={{}}');
  });

  // Start the Server
  app.listen(PORT, () => {
    console.log(`server running http://localhost:${PORT}`);
    console.log('press CTRL+C to stop server');
  });
})();
