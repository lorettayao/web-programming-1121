import { privateEnv } from "../env/private";
import { publicEnv } from "../env/public";

import express from 'express';
import Pusher from 'pusher';

const app = express();

const pusher = new Pusher({
  appId: privateEnv.PUSHER_ID,
  key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
  secret: privateEnv.PUSHER_SECRET,
  cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

app.use(express.json());

app.post('/api/updateDocument', (req: express.Request, res: express.Response) => {
  const { documentId, title, content } = req.body;

  // Update the document logic here

  // Trigger the document update event
  pusher.trigger(`document-${documentId}`, 'documentUpdate', { title, content });

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});