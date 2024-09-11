import mongoose from 'mongoose';

const ConnectionSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  lastHeartbeat: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Connection = mongoose.models.Connection || mongoose.model('Connection', ConnectionSchema);

export default Connection;
