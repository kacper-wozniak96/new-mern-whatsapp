import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 9000;

const connection_url =
  'mongodb+srv://admin:FKS30RUEmOf5npRt@cluster0.gabj6.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get('/', (req, res) => res.status(200).send('hello world'));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
