import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

(async () => {
  // setup server and external middleware
  const app = express();
  const PORT = process.env.PORT || 8082;
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMETERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /** ************************************************************************** */

  //! END @TODO1

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
