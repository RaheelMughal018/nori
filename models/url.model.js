import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  short_url: {
    type: String,
    required: true,
    unique: true,
  },
  redirect_url: {
    type: String,
    required: true,
    unique: true,
  },
  visit_history: [
    {
      timestamp: {
        type: Number,
        default: Date.now,
      },
    },
  ],
  clicks: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const URL = mongoose.model("URL", urlSchema);
export default URL;
