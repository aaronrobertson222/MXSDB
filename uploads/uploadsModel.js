const moment = require('moment');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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
    type: String
  },
  creator: {
    type: String,
    required: true
  },
  uploadDate: {type: Date, required: true},
  downloadCount: {type: Number, required: true, default: 0},
  description: {type: String, default: 'No Description'},
  fileKey: {type: String, required: true},
  fileLocation: {type: String, required: true},
  imgKey: {type: String, required: true},
  imgLocation: {type: String, required: true}
});

UploadSchema.plugin(mongoosePaginate);

UploadSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    itemType: this.itemType,
    category: this.category,
    creator: this.creator,
    uploadDate: moment(this.uploadDate).format("MMM DD, YYYY"),
    downloadCount: this.downloadCount,
    description: this.description,
    imgLocation: this.imgLocation,
    fileLocation: this.fileLocation
  };
}

const Uploads = mongoose.model('Uploads', UploadSchema);

module.exports = {Uploads};
