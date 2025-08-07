import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const notificationSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: "User", required: true},
    type: {type: String, enum: ["booking_created", "booking_confirmed", "booking_cancelled", "booking_completed", "booking_rejected"], required: true},
    title: {type: String, required: true},
    message: {type: String, required: true},
    booking: {type: ObjectId, ref: "Booking", required: true},
    isRead: {type: Boolean, default: false},
    readAt: {type: Date}
},{timestamps: true})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification
