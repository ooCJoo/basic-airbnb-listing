const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    listing_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now
    }      
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;