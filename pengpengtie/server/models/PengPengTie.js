const mongoose = require('mongoose');

const pengPengTieSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model('PengPengTie', pengPengTieSchema);
