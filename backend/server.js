/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
// eslint-disable-next-line import/extensions
import Messages from './dbMessages.js';

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: '1102224',
  key: '5b2bf77f4143a21211ba',
  secret: 'af7d445a6056becd1a32',
  cluster: 'eu',
  useTLS: true,
});

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
// eslint-disable-next-line camelcase
const connection_url =
  'mongodb+srv://admin:FKS30RUEmOf5npRt@cluster0.gabj6.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB is connected');

  const msgCollection = db.collection('messagecontents');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    console.log(change);

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log('Error triggering Pusher');
    }
  });
});

app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
  Messages.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
