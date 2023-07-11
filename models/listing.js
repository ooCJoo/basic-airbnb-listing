const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    lat:{
        type: Number,
        required: true
    },
    lng: {
        type: Number,
         required: true
    },
    description: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now
    }

})

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;