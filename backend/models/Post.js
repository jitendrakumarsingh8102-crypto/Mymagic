const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageUrls: {
    type: [String],
    required: true,
  },
  caption: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);
