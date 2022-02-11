const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxLength: 255, required: true },
        description: { type: String, required: true },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, maxLength: 255, required: true },
        slug: { type: String, slug: 'name', unique: true },
        level: { type: String, maxlength: 255 },
        deletedAt: { type: Date },
    },
    {
        timestamps: true,
    },
);

// Add Plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);
