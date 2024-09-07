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

export default mongoose.model('Connection', ConnectionSchema);