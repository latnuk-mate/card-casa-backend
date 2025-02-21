const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    publishDate: {type: Date , required: true},
    title: {type: String, required: true},
    metaText: {type: Array , required: true},
    components: {type: Array , required: true},
    createdAt: {type: Date, default: Date.now}
});


const blogModal = mongoose.model('blogs' , blogSchema);


module.exports =  blogModal;