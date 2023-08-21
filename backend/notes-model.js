const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postEntrySchema = mongoose.Schema({
    year: {type: String, unique: true},
    entry: {type: String}
})

postEntrySchema.plugin(uniqueValidator);

module.exports = mongoose.model("PostEntryModel", postEntrySchema);
