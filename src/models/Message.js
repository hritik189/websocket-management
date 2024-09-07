import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  connectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Connection',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Message', MessageSchema);