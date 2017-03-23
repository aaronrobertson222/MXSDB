const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UploadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  itemType: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  uploadDate: {type: Date, required: true},
  downloadCount: {type: Number, required: true, default: 0},
  description: {type: String, default: 'No Description'}
});

UploadSchema.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    itemType: this.itemType,
    category: this.category,
    creator: this.creator,
    uploadDate: this.uploadDate,
    downloadCount: this.downloadCount,
    description: this.downloadCount
  };
}

const Uploads = mongoose.model('Uploads', UploadSchema);

module.exports = {Uploads};
