import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

const Messages = mongoose.model('messagecontent', whatsappSchema);

export default Messages;
