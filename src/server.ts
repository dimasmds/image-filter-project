import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

(async () => {
  // setup server and external middleware
  const app = express();
  const PORT = process.env.PORT || 8082;
  app.use(bodyParser.json());

  app.get('/', (request: Request, response: Response) => response.status(200).send({ message: 'Hello World' }));

  app.listen(PORT, () => {
    console.log(`app listen on http://localhost:${PORT}`);
  });
})();
