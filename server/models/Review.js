import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const reviewSchema = new mongoose.Schema({
    booking: {type: ObjectId, ref: "Booking", required: true, unique: true},
    car: {type: ObjectId, ref: "Car", required: true},
    user: {type: ObjectId, ref: "User", required: true},
    rating: {type: Number, required: true, min: 1, max: 5},
    reviewText: {type: String, required: true, minlength: 10, maxlength: 500},
    isVerified: {type: Boolean, default: true} // Since it's from actual booking
},{timestamps: true})

const Review = mongoose.model('Review', reviewSchema)

export default Review
